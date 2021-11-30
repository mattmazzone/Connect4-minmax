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

randomComputer();

}


function mousePressed() {

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