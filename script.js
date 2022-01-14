const scoreBoard = document.querySelector('.scoreboard');
const gameContainer = document.querySelector('.gameContainer');
const restartBtn = document.querySelector('.restart');

let player1;
let player2;

const PlayerGenerator = (name, mark) => {
    let round = Math.random();
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
    return {name, mark, play, round};
};

const gameController = (() => {
    const clearBoard = () => {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        };
    };
    //This will create initial screen.
    const createMenu = () => {
        let element = document.createElement('h3');
        element.textContent = "Welcome";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Player";
        element.addEventListener('click', getNames);
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Computer (working)";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Credits (working?)";
        gameContainer.appendChild(element);
        gameContainer.style.flexDirection = "column";
    };
    //This will clear everything and create initial screen.
    const newGame = () => {
        clearBoard();
        createMenu();
        scoreBoard.textContent = `Game starting ...`;
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
    const updateScoreBoard = () => {
        scoreBoard.textContent = `${player1.name} 0 - 0 ${player2.name}`;
    };
    return {newGame};
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
        if (Gameboard.gameboard[a] === 'X') {
            if (Gameboard.gameboard[a] === Gameboard.gameboard[b] && Gameboard.gameboard[b] === Gameboard.gameboard[c]) {
                gameContainer.children[a].style.backgroundColor = "orange";
                gameContainer.children[b].style.backgroundColor = "orange";
                gameContainer.children[c].style.backgroundColor = "orange";
                console.log(`${player2.name} is the Winner!`);
            };
        } else if (Gameboard.gameboard[a] === 'O') {
            if (Gameboard.gameboard[a] === Gameboard.gameboard[b] && Gameboard.gameboard[b] === Gameboard.gameboard[c]) {
                gameContainer.children[a].style.backgroundColor = "orange";
                gameContainer.children[b].style.backgroundColor = "orange";
                gameContainer.children[c].style.backgroundColor = "orange";
                console.log(`${player1.name} is the Winner!`);
            };
        };
    };
    return {gameboard, create, checkWinner};
})();

restartBtn.addEventListener('click', gameController.newGame);

gameController.newGame();
