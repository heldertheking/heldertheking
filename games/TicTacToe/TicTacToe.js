$(document).ready(function(){
    
})
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

// Reset the game state
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    renderBoard();
    document.getElementById('restart').style.display = 'none';
    $("#board").css("border-color", "black");
    $("#board").css("box-shadow", "3px 3px 7px black");
    $('#winner').html(``)
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
        if (currentPlayer == 'X') {
            $("#board").css("border-color", "red");
            $("#board").css("box-shadow", "3px 3px 7px #B00103");
            $('#winner').html(`Player ${currentPlayer} Won!`)
        } else if (currentPlayer == 'O') {
            $("#board").css("border-color", "#00EE00");
            $("#board").css("box-shadow", "3px 3px 7px #028E02");
            $('#winner').html(`Player ${currentPlayer} Won!`)
        } else {
            alert("Invalid Player!")
        }
        showRestart();
        gameActive = false;
    } else if (checkDraw()) {
        $("#board").css("border-color", "blue");
        $('#winner').html('It\'s a draw!')
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
    $(`#board`).animate({ marginLeft: 0},{queue:false}, 700);
    gameActive = true
}

function back() {
    window.location.href = 'index.html'
}