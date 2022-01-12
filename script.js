const scoreBoard = document.querySelector('.scoreboard');
const gameContainer = document.querySelector('.gameContainer');
const restartBtn = document.querySelector('.restart');

let player1;
let player2;

const PlayerGenerator = (name, mark) => {
    const play = (index) => {
        Gameboard.gameboard[index] = mark;
        gameContainer.children[index].textContent = mark;
    };
    return {name, play};
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
    }
    return {newGame, startGame};
})();

const Gameboard = (() => {
    let gameboard = ['X','O','','','X','','O','X','O'];
    const create = () => {
        const event = function (e) {
            currentPlayer.play(Array.from(document.querySelectorAll('.gameContainer > .square')).indexOf(e.target));
            e.target.removeEventListener('click', event);
        };
        for (let i = 0; i < 9; i++) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('square');
            newSquare.addEventListener('click', event);
            gameContainer.appendChild(newSquare);
        };
    };
    const update = () => {
        
        for (let i = 0; i < 9; i++) {
            const newSquare = document.createElement('div');
            newSquare.textContent = gameboard[i];
        };
    };
    return {gameboard, create, update};
})();

restartBtn.addEventListener('click', gameController.newGame);

gameController.newGame();
let currentPlayer = player1;
