const gameContainer = document.querySelector('.gameContainer');

const Gameboard = (() => {
    let gameboard = ['X','O','','','X','','O','x','O'];
    const updateBoard = () => {
        for (let i = 0; i < 9; i++) {
            const newSquare = document.createElement('div');
            newSquare.textContent = gameboard[i];
            newSquare.classList.add('square');
            gameContainer.appendChild(newSquare);
        };
    };
    return {gameboard, updateBoard};
})();

const PlayerGenerator = (name, mark) => {
    const play = (index) => {
        Gameboard.gameboard[index] = mark;
    };
    return {name, mark, play};
};
