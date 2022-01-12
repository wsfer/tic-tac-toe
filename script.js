const scoreBoard = document.querySelector('.scoreboard');
const gameContainer = document.querySelector('.gameContainer');
const restartBtn = document.querySelector('.restart');

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
        element.addEventListener('click', startGame);
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
        clearBoard(); createMenu();
    };
    const startGame = () => {
        clearBoard();
        Gameboard.create();
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

const PlayerGenerator = (name, mark) => {
    const play = (index) => {
        Gameboard.gameboard[index] = mark;
        gameContainer.children[index].textContent = mark;
    };
    return {name, play};
};

restartBtn.addEventListener('click', gameController.newGame);

gameController.newGame();
const player1 = PlayerGenerator('Jack', 'X');
const player2 = PlayerGenerator('Jame', 'O');
let currentPlayer = player1;
