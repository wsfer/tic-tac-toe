

const gameContainer = document.querySelector('.gameContainer');

const Gameboard = (() => {
    let gameboard = ['X','O','','','X','','O','X','O'];
    const updateBoard = () => {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        }
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
    return {gameboard, updateBoard};
})();

const PlayerGenerator = (name, mark) => {
    const play = (index) => {
        Gameboard.gameboard[index] = mark;
        Gameboard.updateBoard();
    };
    return {name, mark, play};
};

const player1 = PlayerGenerator('Jack', 'X');
const player2 = PlayerGenerator('Jame', 'O');
let currentPlayer = player1;
