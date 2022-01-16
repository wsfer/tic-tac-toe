const scoreBoard = document.querySelector('.scoreboard');
const gameContainer = document.querySelector('.gameContainer');
const restartBtn = document.querySelector('.restart');
const newRndBtn = document.querySelector('.newRound');

let player1;
let player2;

const PlayerGenerator = (name, mark) => {
    let round = Math.random();
    let _score = 0;
    const getScore = () => _score;
    const getName = () => {
        if (!name) {
            return 'player';
        } else if (name.length > 10) {
            return name.slice(0, 11);
        } else {
            return name;
        };
    };
    const play = (index) => {
        let index2 = 0;
        gameContainer.children[index].textContent = mark;
        while (index > 2) {
            index2++;
            index = index - 3;
        }
        Gameboard.gameboard[index][index2] = mark;
        if (Gameboard.checkWinner(mark)) {
            _score++;
            if (_score === 3) {
                scoreBoard.textContent = `${getName()} is the Winner`;
            } else {
                newRndBtn.style.visibility = "visible";
                scoreBoard.textContent = `${getName()} won the round`;
            };
        };
    };
    return {getName, getScore, play, round};
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
        element.addEventListener('click', getNamesMenu);
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Computer (working)";
        element.addEventListener('click', getPlayerNameMenu);
        gameContainer.appendChild(element);
        gameContainer.style.flexDirection = "column";
    };
    //This will clear everything and create initial screen.
    const newGame = () => {
        clearBoard();
        createMenu();
        newRndBtn.style.visibility = "hidden";
        scoreBoard.textContent = '---';
        Gameboard.gameboard = [['','',''],['','',''],['','','']];
    };
    //This will be called when multiplayer is selected.
    const getNamesMenu = () => {
        clearBoard();
        let element = document.createElement('h3');
        element.textContent = "Player Names: ";
        gameContainer.appendChild(element);
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
        element = document.createElement('button');
        element.textContent = "Start Game";
        element.addEventListener('click', startGame);
        gameContainer.appendChild(element);
    };
    //This will be called when play agaisnt computer is selected.
    const getPlayerNameMenu = () => {
        clearBoard();
        let element = document.createElement('h3');
        element.textContent = "Your name: ";
        gameContainer.appendChild(element);
        element = document.createElement('input');
        element.setAttribute('id', 'playerOne');
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Start Game";
        element.addEventListener('click', startGame);
        gameContainer.appendChild(element)

    }
    const startGame = () => {
        player1 = PlayerGenerator(document.getElementById('playerOne').value, 'O');
        if (document.getElementById('playerTwo')) {
            player2 = PlayerGenerator(document.getElementById('playerTwo').value, 'X');
            computerPlay = false;
        } else {
            player2 = PlayerGenerator(randomName(), 'X');
            computerPlay = true;
        }
        
        clearBoard();
        updateScoreBoard();
        Gameboard.create();
    };
    const randomName = () => {
        let names = ['Mark', 'Beth', 'Miguel', 'Marcos', 'Sasha'];
        return names[Math.round(Math.random()*names.length)];
    }
    const newRound = () => {
        displayController.clearBoard();
        Gameboard.create();
        displayController.updateScoreBoard();
        newRndBtn.style.visibility = "hidden";
        Gameboard.gameboard = [['','',''],['','',''],['','','']];
    }
    const updateScoreBoard = () => {
        scoreBoard.textContent = `${player1.getName()} ${player1.getScore()} - ${player2.getScore()} ${player2.getName()}`;
    };
    return {newGame, updateScoreBoard, newRound, clearBoard};
})();

const Gameboard = (() => {
    let gameboard = [['','',''],['','',''],['','','']];
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
    const checkWinner = (mark) => {
        //Check rows.
        for (let i = 0; i < 3; i++) {
            if (Gameboard.gameboard[0][i] === mark &&
                Gameboard.gameboard[1][i] === mark &&
                Gameboard.gameboard[2][i] === mark) {
                _changeSquaresColor(i*3, i*3+1, i*3+2);
                return true;
            };
        };
        //Check columns.
        for (let i = 0; i < 3; i++) {
            if (Gameboard.gameboard[i][0] === mark &&
                Gameboard.gameboard[i][1] === mark &&
                Gameboard.gameboard[i][2] === mark) {
                _changeSquaresColor(i, i+3, i+6);
                return true;
            };
        };
        //Check diagonals.
        if (Gameboard.gameboard[0][0] === mark &&
            Gameboard.gameboard[1][1] === mark &&
            Gameboard.gameboard[2][2] === mark) {
            _changeSquaresColor(0, 4, 8);
            return true;
        } else if (Gameboard.gameboard[2][0] === mark &&
            Gameboard.gameboard[1][1] === mark &&
            Gameboard.gameboard[0][2] === mark) {
            _changeSquaresColor(2, 4, 6);
            return true;
        };
    };
    const _changeSquaresColor = (index1, index2, index3) => {
        gameContainer.children[index1].style.backgroundColor = "orange";
        gameContainer.children[index2].style.backgroundColor = "orange";
        gameContainer.children[index3].style.backgroundColor = "orange";
    }
    return {gameboard, create, checkWinner, whoIsNext};
})();

restartBtn.addEventListener('click', displayController.newGame);
newRndBtn.addEventListener('click', displayController.newRound);

displayController.newGame();

//Computer AI

const computerAI = (() => {
    const easyAI = () => {
        let randomNumber = Math.round(Math.random()*9);
        if (Gameboard.gameboard[randomNumber] === '') {
            Gameboard.whoIsNext().play(randomNumber);
        } else {
            easyAI();
        };
    };
    return {easyAI};
})();