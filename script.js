let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let vsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
const playVsPlayerButton = document.getElementById('play-vs-player');
const playVsAIButton = document.getElementById('play-vs-ai');

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
playVsPlayerButton.addEventListener('click', () => setGameMode(false));
playVsAIButton.addEventListener('click', () => setGameMode(true));

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    
    if (gameBoard[cellIndex] !== "" || !gameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameBoard.includes("")) {
        switchPlayer();
        if (vsAI && currentPlayer === "O") {
            aiMove();
        }
    } else {
        message.textContent = `It's a draw!`;
        gameActive = false;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameBoard[index] === currentPlayer);
    });
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
}

function setGameMode(ai) {
    vsAI = ai;
    restartGame();
}

function aiMove() {
    let availableCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === "") availableCells.push(index);
    });

    if (availableCells.length > 0) {
        const aiChoice = availableCells[Math.floor(Math.random() * availableCells.length)];
        gameBoard[aiChoice] = "O";
        cells[aiChoice].textContent = "O";

        if (checkWin()) {
            message.textContent = `AI (O) wins!`;
            gameActive = false;
        } else if (gameBoard.includes("")) {
            switchPlayer();
        } else {
            message.textContent = `It's a draw!`;
            gameActive = false;
        }
    }
}