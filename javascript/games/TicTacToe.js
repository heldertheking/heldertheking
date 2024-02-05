$(document).ready(function(){
    
})
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Reset the game state
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    renderBoard();
    document.getElementById('restart').style.display = 'none';
}

function checkWinner() {
     const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function handleClick(index) {
    if (!gameActive || gameBoard[index] !== '') {
        return;
    }

    gameBoard[index] = currentPlayer;
    renderBoard();
    
    if (checkWinner()) {
        alert(`Player ${currentPlayer} wins!`);
        $("#board").css("border-color", "red");
        showRestart();
        gameActive = false;
    } else if (checkDraw()) {
        alert('It\'s a draw!');
        $("#board").css("border-color", "blue");
        showRestart();
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    gameBoard.forEach((value, index) => {
        const cell = document.getElementById(`cell-${index}`);
        cell.textContent = value;
    });
}

function showRestart() {
    document.getElementById('restart').style.display = 'block';
}

function StartSeq() {
    document.querySelectorAll(".startMenu").forEach(a=>a.style.display = "none");
}
