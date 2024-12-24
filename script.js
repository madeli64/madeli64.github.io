let guessNumber = randomNumber(100); 
console.log(guessNumber);
let userGuess;
let guessCount = 0;

createBoard();

function randomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}

function checkSelect() {
    if (guessCount < 10) {
        if (guessNumber == userGuess) {
             gameFinished("win") 
        } else {
            news();
        }
    } else {
        if (guessNumber == userGuess) {
             gameFinished("win"); 
        } else {
            gameFinished("lost");
        }
    }
}

function createBoard() {
    const board = document.querySelector(".planche");
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `id_${i}`;
        cell.addEventListener("click", cellSelected);
        board.appendChild(cell);    
    }
}

function cellSelected() {
    guessCount++;
    const cell = this;
    cell.textContent = cell.id.slice(3);
    userGuess = Number(cell.textContent);
    cell.style.background = "red";
    cell.style.color = "white";
    cell.style.boxShadow = "1px 1px 1px rgb(0,0,0,0.5)";
    cell.removeEventListener("click", cellSelected);
    checkSelect();
}

function news() {
    const dirs = document.querySelectorAll(".dir .arrow");
    for (const dir of dirs) {
        dir.style.background = "unset";
    }

    let direction = "";  
    const g_row = (guessNumber % 10 == 0) ? guessNumber / 10 : Math.floor(guessNumber / 10) + 1;
    const g_col = (guessNumber % 10 == 0) ? 10 : guessNumber % 10;
    const u_row = (userGuess % 10 == 0) ? userGuess / 10 : Math.floor(userGuess / 10) + 1;
    const u_col = (userGuess % 10 == 0) ? 10 : userGuess % 10;
    if (g_col < u_col) {
        direction += "W"; 
        if (g_row < u_row) {
            direction += "N";
        } else if (g_row == u_row) {
            // nothing
        } else {
            direction += "S";
        }
    } else if (g_col == u_col) {
        // Not W & E
        if (g_row < u_row) {
            direction += "N";
        } else if (g_row == u_row) {
            // nothing
        } else {
            direction += "S";
        }
    } else {
        direction += "E"; 
        if (g_row < u_row) {
            direction += "N";
        } else if (g_row == u_row) {
            // nothing
        } else {
            direction += "S";
        }
    }
    const dir_cell = document.querySelector(`.dir #${direction}`);
    dir_cell.style.background = "lightgreen"; 
    return direction;
} 

function restart() {
    const cells = document.querySelectorAll(".planche div");
    for (const cell of cells) {
        cell.textContent = null;
        cell.style.color = "unset";
        cell.style.background = "unset";
        cell.style.boxShadow = "unset";
        cell.addEventListener("click", cellSelected);
    }
    const message = document.querySelector("footer .game-over");
    const playAgain = document.querySelector("footer #restart");

    message.textContent = null;
    playAgain.parentElement.removeChild(playAgain);
    guessCount = 0;
    guessNumber = randomNumber(100);
}

function gameFinished(gameResult) {
    if (gameResult === "lost") {
        const cell = document.querySelector(`#id_${userGuess}`);
        cell.textContent = userGuess;
        cell.style.background = "red";
        cell.style.color = "white";
        cell.style.boxShadow = "1px 1px 1px rgb(0,0,0,0.5)";
        cell.removeEventListener("click", cellSelected);

        const message = document.querySelector("footer .game-over");
        message.textContent = "GAME OVER!";
        message.style.color = "red";
        message.style.fontSize = "24px";                
    }

    guessCount = 10;
    const playAgain = document.createElement('button');
    playAgain.textContent = "Play Again!";
    playAgain.setAttribute("id", "restart");
    playAgain.addEventListener("click", restart);
    const footer = document.getElementById("footer");
    footer.appendChild(playAgain);

    const cells = document.querySelectorAll(".planche div");
    for (const cell of cells) {
        if (cell.textContent === '') {
            cell.textContent = cell.id.slice(3);
            cell.style.background = "yellow";  
            cell.removeEventListener("click", cellSelected);              
        }
    }

    const cell = document.querySelector(`#id_${guessNumber}`);
    cell.style.background = "green";
    cell.classList.add('rotated');
    cell.style.boxShadow = "3px 3px 3px rgb(0,0,0,0.8)";
    cell.removeEventListener("click", cellSelected);

    const dirs = document.querySelectorAll(".dir .arrow");
    for (const dir of dirs) {
        dir.style.background = "unset";
    }

}