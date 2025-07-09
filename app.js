var onePlayerBtn = document.getElementById('onePlayer');
var twoPlayerBtn = document.getElementById('twoPlayer');
var menu = document.getElementById('menu');
var game = document.getElementById('game');
var boxes = document.querySelectorAll('.box');
var resetBtn = document.getElementById('resetBtn');
var menuBtn = document.getElementById('menuBtn');
var turnText = document.querySelector('.turn');
var winnerMessage = document.querySelector('.winner-message');
var message = document.getElementById('message');
var playAgainBtn = document.getElementById('playAgain');

var gameMode = 'singlePlayer';
var currentPlayer = 'X';
var board = ["", "", "", "", "", "", "", "", ""];
var isGameActive = false;

var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

onePlayerBtn.onclick = function() {
    gameMode = 'singlePlayer';
    startGame();
};

twoPlayerBtn.onclick = function() {
    gameMode = 'twoPlayer';
    startGame();
};

menuBtn.onclick = function() {
    game.style.display = 'none';
    menu.style.display = 'flex';
};

resetBtn.onclick = function() {
    startNewGame();
};

playAgainBtn.onclick = function() {
    startNewGame();
};

function startGame() {
    menu.style.display = 'none';
    game.style.display = 'flex';
    startNewGame();
}

function startNewGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ["", "", "", "", "", "", "", "", ""];
    turnText.textContent = "Player X's Turn";
    winnerMessage.style.display = 'none';

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
        boxes[i].classList.remove('x', 'o', 'win');
    }
}

function handleBoxClick(event) {
    var clickedBox = event.target;
    var index = clickedBox.dataset.index;

    if (board[index] !== '' || !isGameActive) {
        return;
    }

    board[index] = currentPlayer;
    clickedBox.innerText = currentPlayer;
    clickedBox.classList.add(currentPlayer.toLowerCase());

    checkResult();

    if (isGameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnText.textContent = "Player " + currentPlayer + "'s Turn";

        if (gameMode === 'singlePlayer' && currentPlayer === 'O') {
            turnText.textContent = "Computer's Turn";
            setTimeout(computerTurn, 500);
        }
    }
}

for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', handleBoxClick);
}

function checkResult() {
    var roundWon = false;
    for (var i = 0; i < winningConditions.length; i++) {
        var condition = winningConditions[i];
        var a = board[condition[0]];
        var b = board[condition[1]];
        var c = board[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = 'Player ' + currentPlayer + ' Wins!';
        winnerMessage.style.display = 'flex';
        isGameActive = false;
        return;
    }

    var isDraw = !board.includes("");
    if (isDraw) {
        message.textContent = "It's a Draw!";
        winnerMessage.style.display = 'flex';
        isGameActive = false;
    }
}

function computerTurn() {
    if (!isGameActive) return;

    var availableSpots = [];
    for (var i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableSpots.push(i);
        }
    }

    var randomIndex = Math.floor(Math.random() * availableSpots.length);
    var computerMoveIndex = availableSpots[randomIndex];

    board[computerMoveIndex] = 'O';
    var box = document.querySelector('.box[data-index="' + computerMoveIndex + '"]');
    box.innerText = 'O';
    box.classList.add('o');

    checkResult();

    if (isGameActive) {
        currentPlayer = 'X';
        turnText.textContent = "Player X's Turn";
    }
}
