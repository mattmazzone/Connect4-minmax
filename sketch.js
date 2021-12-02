function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

let grid;

let cols;
let rows;

let d;
let xPos;
let yPos;

let pcTurn = false;
let gameOver = false;


function setup() {
    createCanvas(1700, 800);
    frameRate(60);

    cols = 7;
    rows = 6;

    d = 80;

    grid = make2DArray(cols, rows);

}


function draw() {

    if (pcTurn){
        randomComputer();
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            xPos = (i * d * 1.2) + d;
            yPos = (j * d * 1.2) + d;

            if (grid[i][j] === 0) {
                fill(255);
            } else if (grid[i][j] === 1) {
                fill(0);
            } else if (grid[i][j] === 2) {
                fill(255, 0, 0);
            }
            noStroke();
            circle(xPos, yPos, d);
        }
    }


}


function mousePressed() {

    if (!gameOver && !pcTurn) {

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (dist(mouseX, 0, i * d * 1.2 + d, 0) < d / 2) {


                    // Places a red token if cell is empty and lowest in board
                    if (lowestEmpty(i) != -1) {
                        grid[i][lowestEmpty(i)] = 2;

                        break;
                    }
                    // If column is full computer should not play
                    return;

                }
            }
        }

        if (checkWin()) {
            alert('The game is over')

        }
        pcTurn = true;
    } else {
        alert('The game is over')
    }

}


function lowestEmpty(i) {
    let lowest = -1;

    for (let j = 0; j < rows; j++) {

        if (grid[i][j] === 0) {
            lowest = j;
        }
    }

    return lowest;
}


function randomComputer() {
    if (!gameOver) {

        let computerY = -1;
        let computerX = -1;

        while (computerY === -1) {
            computerX = Math.floor(Math.random() * cols);
            computerY = lowestEmpty(computerX, 0);
        }
        grid[computerX][computerY] = 1;
    }
    pcTurn = false;
    checkWin();
}

function checkWin() {

    // Vertical connect4
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 3; j++) {


            if (grid[i][j] === 2 && grid[i][j + 1] === 2 && grid[i][j + 2] === 2 && grid[i][j + 3] === 2) {
                console.log('red wins');
                gameOver = true;
                return true
            } else if (grid[i][j] === 1 && grid[i][j + 1] === 1 && grid[i][j + 2] === 1 && grid[i][j + 3] === 1) {
                console.log('black wins');
                gameOver = true;
                return true
            }
        }
    }

    // Horizontal connect4
    for (let i = 0; i < cols - 3; i++) {
        for (let j = 0; j < rows; j++) {


            if (grid[i][j] === 2 && grid[i + 1][j] === 2 && grid[i + 2][j] === 2 && grid[i + 3][j] === 2) {
                console.log('red wins');
                gameOver = true;
                return true;
            } else if (grid[i][j] === 1 && grid[i + 1][j] === 1 && grid[i + 2][j] === 1 && grid[i + 3][j] === 1) {
                console.log('black wins');
                gameOver = true;
                return true;
            }
        }
    }

    // Diagonal connect4 (1)
    for (let i = 0; i < cols - 3; i++) {
        for (let j = 0; j < rows - 3; j++) {


            if (grid[i][j] === 2 && grid[i + 1][j + 1] === 2 && grid[i + 2][j + 2] === 2 && grid[i + 3][j + 3] === 2) {
                console.log('red wins');
                gameOver = true;
                return true;
            } else if (grid[i][j] === 1 && grid[i + 1][j + 1] === 1 && grid[i + 2][j + 2] === 1 && grid[i + 3][j + 3] === 1) {
                console.log('black wins');
                gameOver = true;
                return true;
            } else if (grid[i][j + 3] === 2 && grid[i + 1][j + 2] === 2 && grid[i + 2][j + 1] === 2 && grid[i + 3][j] === 2) {
                console.log('red wins');
                gameOver = true;
                return true;
            } else if (grid[i][j + 3] === 1 && grid[i + 1][j + 2] === 1 && grid[i + 2][j + 1] === 1 && grid[i + 3][j] === 1) {
                console.log('black wins');
                gameOver = true;
                return true;
            }

        }
    }

    return false;

}