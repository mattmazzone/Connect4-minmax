function make2DArray(cols, rows) {
    var arr = new Array(cols);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

var grid;

var cols;
var rows;

var d;

var playerTurn = true;

var gameOver = false;


function setup() {
    createCanvas(1700, 800);
    frameRate(60);

    cols = 7;
    rows = 6;

    d = 80;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new c4piece(i, j, d);
        }
    }
}




function draw() {

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    

}


function mousePressed() {

    if(!gameOver){

    if (playerTurn){

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (dist(mouseX, mouseY, i * d*1.2+d, j * d*1.2+d) < d/2){
                    

                    //Checks if clicked cell is the lowest in the board
                    

                    //Places a red token if cell is empty and lowest in board
                    if (lowestEmpty(i) === j && !grid[i][j].red && !grid[i][j].black){
                        grid[i][j].red = true;
                        grid[i][j].empty = false;
                        playerTurn = false;
                    break;
                    }

                    
                }
            }
        }
    }
    checkWin();
    randomComputer(); 
    checkWin();
}
else{
    alert('The game is over')
}

}


function lowestEmpty(i) {
    var lowest = -1;

    for (let j = 0; j<rows; j++){
        
        if (grid[i][j].empty){
            lowest = j;       
        }
    }
    console.log(lowest)
    return lowest;
}


function randomComputer(){
    if (!playerTurn){

        let computerY = -1;
        let computerx = -1;
                
        while (computerY === -1){
            computerX = Math.floor(Math.random() * cols);
            computerY = lowestEmpty(computerX, 0);
        }
        grid[computerX][computerY].black = true;
        grid[computerX][computerY].empty = false;
        playerTurn = true;
        

    }
}

function checkWin(){

    //Vertical connect4
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows -3; j++) {
             

            if(grid[i][j].red && grid[i][j+1].red && grid[i][j+2].red && grid[i][j+3].red) {
                console.log('red wins');
                gameOver = true;
            }
            if(grid[i][j].black && grid[i][j+1].black && grid[i][j+2].black && grid[i][j+3].black) {
                console.log('black wins');
                gameOver = true;
            }
        }
    }

    //Horizontal connect4
    for (let i = 0; i < cols-3; i++) {
        for (let j = 0; j < rows; j++) {
             

            if(grid[i][j].red && grid[i+1][j].red && grid[i+2][j].red && grid[i+3][j].red) {
                console.log('red wins');
                gameOver = true;
            }
            else if(grid[i][j].black && grid[i+1][j].black && grid[i+2][j].black && grid[i+3][j].black) {
                console.log('black wins');
                gameOver = true;
            }
        }
    }

    //Diagonal connect4 (1)
    for (let i = 0; i < cols-3; i++) {
        for (let j = 0; j < rows-3; j++) {
             

            if(grid[i][j].red && grid[i+1][j+1].red && grid[i+2][j+2].red && grid[i+3][j+3].red) {
                console.log('red wins');
                gameOver = true;
            }
            else if(grid[i][j].black && grid[i+1][j+1].black && grid[i+2][j+2].black && grid[i+3][j+3].black) {
                console.log('black wins');
                gameOver = true;
            }

            else if(grid[i][j+3].red && grid[i+1][j+2].red && grid[i+2][j+1].red && grid[i+3][j].red) {
                console.log('red wins');
                gameOver = true;
            }
            else if(grid[i][j+3].black && grid[i+1][j+2].black && grid[i+2][j+1].black && grid[i+3][j].black) {
                console.log('black wins');
                gameOver = true;
            }

        }
    }



}