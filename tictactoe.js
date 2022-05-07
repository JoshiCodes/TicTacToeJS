const styles = `
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css");
   
    body {
        background-image: url("https://janschreiber.github.io/img2/black-chalk.jpg");
        color: white;
    }
    
    .error {
        background-color: #fa8072;
    }
    
    .box {
       margin-left: 5%;
    }
   
    .container {
        margin-top: 5%;
        margin-left: 5%;
        display: flex;
        flex-direction: row;
    }
    
    .info {
        margin-left: 50px;
    }
    
    .square {
        background-color: white;
        border-color: black;
        border: 1px solid #999;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        float: left;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px;
    }
    
    .square:hover {
        background-color: lightGray;
    }
    
    .square:focus {
        outline: none;
    }
   
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

let fields = Array(9).fill(0);

const players = {
    1: 'X',
    2: 'O'
}

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameOver = false;
let current = 1;

/**
 *
 * @param button
 */
function handleClick(button) {

    if(gameOver) {
        button.style = "background-color: #fa8072;";
        setTimeout(() => {
            button.style = "";
        }, 250)
        return;
    }

    if(button.innerText !== "") {
        return;
    }

    button.innerText = players[current];

    const id = button.id;
    if(id == null) return;
    fields[id] = current;


    console.log(fields)

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        win(current);
    } else {
        if(current === 1) current = 2;
        else current = 1;
        updateCurrent()
    }

}

function win(winner) {
    const e = document.getElementById("current");
    if(e == null) return;
    e.innerText = "Spieler " + winner + " hat das Spiel gewonnen!";
    setInfoMsg("Das Spiel ist vorbei!")
}

function clearField() {
    fields = Array(9).fill(0);
    const elements = document.getElementsByClassName("square");
    console.log(elements)
    for(let i = 0; i < elements.length; i++) {
        const e = elements[i];
        console.log(e)
        e.innerText = "";
    }
}

function updateCurrent() {
    const e = document.getElementById("current");
    if(e == null) return;
    e.innerText = "Spieler " + current + " ist am Zug.";
}

function setInfoMsg(msg) {
    const text = document.getElementById("msg");
    if(text == null) return;
    text.innerText = msg;
}

function init() {
    console.log("init")
    gameOver = false;
    current = 1;
    clearField();
    updateCurrent();
}