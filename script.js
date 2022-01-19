const scoreBoard = document.querySelector('.scoreboard');
const gameContainer = document.querySelector('.gameContainer');
const restartBtn = document.querySelector('.restart');
const newRndBtn = document.querySelector('.newRound');

let player1;
let player2;
let nextPlayer = [];

const PlayerGenerator = (name, mark) => {
    let _score = 0;
    let isComputer = false;
    const getMark = () => mark;
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
        nextPlayer.push(nextPlayer[0]);
        let index2 = 0;
        gameContainer.children[index].textContent = mark;
        while (index > 2) {
            index2++;
            index = index - 3;
        }
        gameController.gameboard[index][index2] = mark;
        if (gameController.checkWinner(mark)) {
            _score++;
            if (_score === 3) {
                scoreBoard.textContent = `${getName()} is the Winner`;
            } else {
                newRndBtn.style.visibility = "visible";
                scoreBoard.textContent = `${getName()} won the round`;
            };
        };
        nextPlayer.shift();
        if (nextPlayer[0].isComputer) {
            setTimeout(() => {nextPlayer[0].play(Math.round(Math.random()*8))}, 1000);
        };
    };
    return {getName, getScore, play, getMark, isComputer};
};

const displayController = (() => {
    const _clearBoard = () => {
        while (gameContainer.firstChild) {
            gameContainer.removeChild(gameContainer.firstChild);
        };
    };
    //This will create initial screen.
    const _createMenu = () => {
        let element = document.createElement('h3');
        element.textContent = "How do you like to play?";
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Player";
        element.addEventListener('click', _getNamesMenu);
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Player vs Computer (working)";
        element.addEventListener('click', _getPlayerNameMenu);
        gameContainer.appendChild(element);
        gameContainer.style.flexDirection = "column";
    };
    //This will clear everything and create initial screen.
    const newGame = () => {
        _clearBoard();
        _createMenu();
        newRndBtn.style.visibility = "hidden";
        scoreBoard.textContent = '---';
        gameController.gameboard = [['','',''],['','',''],['','','']];
    };
    //This will be called when multiplayer is selected.
    const _getNamesMenu = () => {
        _clearBoard();
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
        element.addEventListener('click', _startGame);
        gameContainer.appendChild(element);
    };
    //This will be called when play agaisnt computer is selected.
    const _getPlayerNameMenu = () => {
        _clearBoard();
        let element = document.createElement('h3');
        element.textContent = "Your name: ";
        gameContainer.appendChild(element);
        element = document.createElement('input');
        element.setAttribute('id', 'playerOne');
        gameContainer.appendChild(element);
        element = document.createElement('button');
        element.textContent = "Start Game";
        element.addEventListener('click', _startGame);
        gameContainer.appendChild(element)

    }
    const _startGame = () => {
        player1 = PlayerGenerator(document.getElementById('playerOne').value, 'O');
        if (document.getElementById('playerTwo')) {
            player2 = PlayerGenerator(document.getElementById('playerTwo').value, 'X');
            computerPlay = false;
        } else {
            player2 = PlayerGenerator(_randomName(), 'X');
            computerPlay = true;
            player2.isComputer = true;
        };
        const whoWillStart = (() => {
            let p1 = Math.random();
            let p2 = Math.random();
            if (p1 > p2) {
                nextPlayer.push(player1);
                nextPlayer.push(player2);
            } else {
                nextPlayer.push(player2);
                nextPlayer.push(player1);
            }
        })();
        _clearBoard();
        _updateScoreBoard();
        _createGameboard();
        if (nextPlayer[0].isComputer) {
            nextPlayer[0].play(Math.round(Math.random()*8));
        };
    };
    const _createGameboard = () => {
        const event = function (e) {
            nextPlayer[0].play(Array.from(document.querySelectorAll('.gameContainer > .square')).indexOf(e.target));
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
    const _randomName = () => {
        let names = ['Mark', 'Beth', 'Miguel', 'Marcos', 'Sasha'];
        return names[Math.round(Math.random()*names.length)];
    }
    const newRound = () => {
        _clearBoard();
        _createGameboard();
        _updateScoreBoard();
        newRndBtn.style.visibility = "hidden";
        gameController.gameboard = [['','',''],['','',''],['','','']];
    }
    const _updateScoreBoard = () => {
        scoreBoard.textContent = `${player1.getName()} ${player1.getScore()} - ${player2.getScore()} ${player2.getName()}`;
    };
    return {newGame, newRound};
})();

const gameController = (() => {
    let gameboard = [['','',''],['','',''],['','','']];
    const checkWinner = (mark) => {
        //Check rows.
        for (let i = 0; i < 3; i++) {
            if (gameController.gameboard[0][i] === mark &&
                gameController.gameboard[1][i] === mark &&
                gameController.gameboard[2][i] === mark) {
                _changeSquaresColor(i*3, i*3+1, i*3+2);
                return true;
            };
        };
        //Check columns.
        for (let i = 0; i < 3; i++) {
            if (gameController.gameboard[i][0] === mark &&
                gameController.gameboard[i][1] === mark &&
                gameController.gameboard[i][2] === mark) {
                _changeSquaresColor(i, i+3, i+6);
                return true;
            };
        };
        //Check diagonals.
        if (gameController.gameboard[0][0] === mark &&
            gameController.gameboard[1][1] === mark &&
            gameController.gameboard[2][2] === mark) {
            _changeSquaresColor(0, 4, 8);
            return true;
        } else if (gameController.gameboard[2][0] === mark &&
            gameController.gameboard[1][1] === mark &&
            gameController.gameboard[0][2] === mark) {
            _changeSquaresColor(2, 4, 6);
            return true;
        };
    };
    const _changeSquaresColor = (index1, index2, index3) => {
        gameContainer.children[index1].style.backgroundColor = "orange";
        gameContainer.children[index2].style.backgroundColor = "orange";
        gameContainer.children[index3].style.backgroundColor = "orange";
    };
    return {gameboard, checkWinner};
})();

restartBtn.addEventListener('click', displayController.newGame);
newRndBtn.addEventListener('click', displayController.newRound);

displayController.newGame();

//Computer AI

const computerAI = (() => {
    let _enemy = player1;
    const willEnemyWin = () => {

    };
    const computerMove = () => {

    };
    return {computerMove};
})();