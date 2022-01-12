const gameContainer = document.querySelector('.gameContainer');
const gameController = (() => {
    const clearBoard = () => {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        };
    };
    const createMenu = () => {
        let element = document.createElement('h3');
        element.textContent = "Welcome";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Player";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Computer (working)";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Credits (working?)";
        gameContainer.appendChild(element);
        gameContainer.style.flexDirection = "column";
    };
    const newGame = () => {
        clearBoard(); createMenu();
    };
    return {newGame};
})();

gameController.newGame();

const Gameboard = (() => {
    let gameboard = ['X','O','','','X','','O','X','O'];
    const update = () => {
        
        for (let i = 0; i < 9; i++) {
            const newSquare = document.createElement('div');
            newSquare.textContent = gameboard[i];
            newSquare.classList.add('square');
            newSquare.addEventListener('click', function (e) {
                currentPlayer.play(Array.from(document.querySelectorAll('.gameContainer > .square')).indexOf(e.target));
            });
            gameContainer.appendChild(newSquare);
        };
    };
    return {gameboard, update};
})();

const PlayerGenerator = (name, mark) => {
    const play = (index) => {
        Gameboard.gameboard[index] = mark;
        Gameboard.update();
    };
    return {name, mark, play};
};

const player1 = PlayerGenerator('Jack', 'X');
const player2 = PlayerGenerator('Jame', 'O');
let currentPlayer = player1;
