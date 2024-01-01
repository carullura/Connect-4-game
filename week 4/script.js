const grid = document.getElementById('grid');
let currentPlayer = 'red';
let gameBoard = [];

function createGrid() {
    for (let row = 0; row < 6; row++) {
        gameBoard[row] = [];
        for (let col = 0; col < 7; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell empty';
            cell.setAttribute('data-row', row);
            cell.setAttribute('data-col', col);
            cell.addEventListener('click', handleCellClick);
            grid.appendChild(cell);
            gameBoard[row][col] = null;
        }
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const row = parseInt(clickedCell.getAttribute('data-row'));
    const col = parseInt(clickedCell.getAttribute('data-col'));

    if (isValidMove(col)) {
        const emptyRow = getEmptyRow(col);
        gameBoard[emptyRow][col] = currentPlayer;
        updateGrid();
        if (checkForWin(emptyRow, col)) {
            alert(`${currentPlayer.toUpperCase()} wins!`);
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    }
}

function isValidMove(col) {
    return gameBoard[0][col] === null;
}

function getEmptyRow(col) {
    for (let row = 5; row >= 0; row--) {
        if (gameBoard[row][col] === null) {
            return row;
        }
    }
}

function updateGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const row = parseInt(cell.getAttribute('data-row'));
        const col = parseInt(cell.getAttribute('data-col'));
        const value = gameBoard[row][col];

        cell.className = `cell ${value || 'empty'}`;
    });
}

function checkForWin(row, col) {
    return (
        checkDirection(row, col, 0, 1) || 
        checkDirection(row, col, 1, 0) || 
        checkDirection(row, col, 1, 1) || 
        checkDirection(row, col, 1, -1)   
    );
}

function checkDirection(row, col, rowDir, colDir) {
    const player = gameBoard[row][col];
    let count = 1;

    
    for (let i = 1; i <= 3; i++) {
        const newRow = row + rowDir * i;
        const newCol = col + colDir * i;

        if (
            newRow >= 0 && newRow < 6 &&
            newCol >= 0 && newCol < 7 &&
            gameBoard[newRow][newCol] === player
        ) {
            count++;
        } else {
            break;
        }
    }

    
    for (let i = 1; i <= 3; i++) {
        const newRow = row - rowDir * i;
        const newCol = col - colDir * i;

        if (
            newRow >= 0 && newRow < 6 &&
            newCol >= 0 && newCol < 7 &&
            gameBoard[newRow][newCol] === player
        ) {
            count++;
        } else {
            break;
        }
    }

    return count >= 4;
}

function resetGame() {
    grid.innerHTML = '';
    gameBoard = [];
    currentPlayer = 'red';
    createGrid();
}

createGrid();
