const scoreBoard = document.querySelector('.scoreboard');
const gameContainer = document.querySelector('.gameContainer');
const restartBtn = document.querySelector('.restart');
const newRndBtn = document.querySelector('.newRound');

let player1;
let player2;

const PlayerGenerator = (name, mark) => {
    let round = Math.random();
    let score = 0;
    const getName = () => {
        if (name === '') {
            return 'player';
        } else {
            return name;
        }
    }
    const play = (index) => {
        Gameboard.gameboard[index] = mark;
        gameContainer.children[index].textContent = mark;
        Gameboard.checkWinner(0, 1, 2);
        Gameboard.checkWinner(3, 4, 5);
        Gameboard.checkWinner(6, 7, 8);
        Gameboard.checkWinner(0, 3, 6);
        Gameboard.checkWinner(1, 4, 7);
        Gameboard.checkWinner(2, 5, 8);
        Gameboard.checkWinner(0, 4, 8);
        Gameboard.checkWinner(2, 4, 6);
    };
    return {getName, score, play, round};
};

const displayController = (() => {
    const clearBoard = () => {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        };
    };
    //This will create initial screen.
    const createMenu = () => {
        let element = document.createElement('h3');
        element.textContent = "How do you like to play?";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Player";
        element.addEventListener('click', getNames);
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Computer (working)";
        gameContainer.appendChild(element);
        gameContainer.style.flexDirection = "column";
    };
    //This will clear everything and create initial screen.
    const newGame = () => {
        clearBoard();
        createMenu();
        newRndBtn.style.visibility = "hidden";
        scoreBoard.textContent = '---';
        Gameboard.gameboard = ['','','','','','','','',''];
    };
    const createInputs = () => {
        element = document.createElement('label');
        element.setAttribute('for', 'playerOne')
        element.textContent = "Player One";
        gameContainer.appendChild(element);
        element = document.createElement('input');
        element.setAttribute('id', 'playerOne')
        gameContainer.appendChild(element);
        element = document.createElement('label');
        element.setAttribute('for', 'playerTwo')
        element.textContent = "Player Two";
        gameContainer.appendChild(element);
        element = document.createElement('input');
        element.setAttribute('id', 'playerTwo')
        gameContainer.appendChild(element);
    };
    //This will create the interface to get player names.
    const getNames = () => {
        clearBoard();
        let element = document.createElement('h3');
        element.textContent = "Player Names: ";
        gameContainer.appendChild(element);
        createInputs();
        element = document.createElement('button');
        element.textContent = "Start Game";
        element.addEventListener('click', startGame);
        gameContainer.appendChild(element);
    };
    const startGame = () => {
        player1 = PlayerGenerator(document.getElementById('playerOne').value, 'O');
        player2 = PlayerGenerator(document.getElementById('playerTwo').value, 'X');
        clearBoard();
        updateScoreBoard();
        Gameboard.create();
    };
    const newRound = () => {
        displayController.clearBoard();
        Gameboard.create();
        displayController.updateScoreBoard();
        newRndBtn.style.visibility = "hidden";
        Gameboard.gameboard = ['','','','','','','','',''];
    }
    const updateScoreBoard = () => {
        scoreBoard.textContent = `${player1.getName()} ${player1.score} - ${player2.score} ${player2.getName()}`;
    };
    return {newGame, updateScoreBoard, newRound, clearBoard};
})();

const Gameboard = (() => {
    let gameboard = ['','','','','','','','',''];
    const create = () => {
        const event = function (e) {
            whoIsNext().play(Array.from(document.querySelectorAll('.gameContainer > .square')).indexOf(e.target));
            e.target.removeEventListener('click', event);
        };
        gameContainer.style.flexDirection = "row";
        for (let i = 0; i < 9; i++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.addEventListener('click', event);
            gameContainer.appendChild(newSquare);
        };
    };
    const whoIsNext = () => {
        if (player1.round == player2.round) {
            player1.round = Math.random();
            player2.round = Math.random();
            whoIsNext();
            //We never know when Math.random will troll...
        };
        if (player1.round > player2.round) {
            player1.round = 0;
            player2.round = 1;
            return player1;
        } else {
            player1.round = 1;
            player2.round = 0;
            return player2;
        };
    };
    const checkWinner = (a, b, c) => {
        if (player1.score === 3) {
            scoreBoard.textContent = `${player1.getName()} is the Winner!`;
            newRndBtn.style.visibility = "hidden";
        } else if (player2.score === 3) {
            scoreBoard.textContent = `${player1.getName()} is the Winner!`;
            newRndBtn.style.visibility = "hidden";
        };
        if (Gameboard.gameboard[a] === 'X') {
            if (Gameboard.gameboard[a] === Gameboard.gameboard[b] && Gameboard.gameboard[b] === Gameboard.gameboard[c]) {
                gameContainer.children[a].style.backgroundColor = "orange";
                gameContainer.children[b].style.backgroundColor = "orange";
                gameContainer.children[c].style.backgroundColor = "orange";
                scoreBoard.textContent = `${player2.getName()} won the round!`;
                player2.score++;
                newRndBtn.style.visibility = "visible";
                return;
            };
        } else if (Gameboard.gameboard[a] === 'O') {
            if (Gameboard.gameboard[a] === Gameboard.gameboard[b] && Gameboard.gameboard[b] === Gameboard.gameboard[c]) {
                gameContainer.children[a].style.backgroundColor = "orange";
                gameContainer.children[b].style.backgroundColor = "orange";
                gameContainer.children[c].style.backgroundColor = "orange";
                scoreBoard.textContent = `${player1.getName()} won the round!`;
                player1.score++;
                newRndBtn.style.visibility = "visible";
                return;
            };
        };
        if (Gameboard.gameboard.filter((squareContent) => squareContent === '').length === 0) {
            scoreBoard.textContent = "It's a Tie!";
            newRndBtn.style.visibility = "visible";
        };
    };
    return {gameboard, create, checkWinner};
})();

restartBtn.addEventListener('click', displayController.newGame);
newRndBtn.addEventListener('click', displayController.newRound);

displayController.newGame();
