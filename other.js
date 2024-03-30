let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

function drawShadow(x, y, color2) {
    ctx.fillStyle = color2;
    ctx.fillRect(x * blockLength, y * blockLength, blockLength, blockLength);

    ctx.strokeStyle = "white";
    ctx.strokeRect(x * blockLength, y * blockLength, blockLength, blockLength);
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * blockLength, y * blockLength, blockLength, blockLength);

    ctx.strokeStyle = "white";
    ctx.strokeRect(x * blockLength, y * blockLength, blockLength, blockLength);
}
let board = [];
for (r = 0; r < rows; r++) {
    board[r] = [];
    for (c = 0; c < cols; c++) {
        board[r][c] = empty;
        console.log(board[r][c]);
    }
}

function drawBoard() {
    console.log("DRAWING BOARD");
    for (r = 0; r < rows; r++) {
        for (c = 0; c < cols; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}
drawBoard();
function clearBoard() {
    console.log("DRAWING BOARD");
    for (r = 0; r < rows; r++) {
        for (c = 0; c < cols; c++) {
            board[r][c] = empty;
        }
    }
}

function drawBoard10Lines() {
    score1 = -1;
    score2 = 0;
    for(r = 9; r < rows; r++) {
        let randomSpot  = Math.floor(Math.random() * 10);
        for(c = 0; c < cols; c++) {
            if(c != randomSpot) {
                board[r][c] = "DarkGray";
            }
        }
    }
    drawBoard();
}
drawBoard10Lines();
//check which squares are black

function checkBoard() {
    counter = 0;
    for(r = 0; r < rows; r++) {
        for(c = 0; c < cols; c++) {
            if(board[r][c]) {
                counter++; 
                console.log("r" + r + "c" + c + " is  not empty" + counter); 
            }
        }
    }
}

