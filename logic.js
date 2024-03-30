let piece = generateRandomPiece();

makePiece.prototype.fill = function(color) {
    for (r = 0; r < this.activePiece.length; r++) {
        for ( c = 0; c < this.activePiece.length; c++) {
            if(this.activePiece[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

makePiece.prototype.shadow = function(color2) {
    for(i = 0; i < rows; i++) {
        let m = i;
        if(piece.overlapTOTAL(0, m, this.activePiece)) {
            let holder = this.y;
            holder = this.y + m - 1;
            for (r = 0; r < this.activePiece.length; r++) {
                for ( c = 0; c < this.activePiece.length; c++) {
                    if(this.activePiece[r][c]) {
                        drawShadow(this.x + c, holder + r, color2);
                    }
                }
            }
            break;
        }
    }
}


makePiece.prototype.draw = function() {
    this.fill(this.color);
    this.shadow("rgba(200, 193, 197, 0.55)");
    /*
    for (r = 0; r < this.activePiece.length; r++) {
        for (c = 0; c < this.activePiece.length; c++) {
            if(this.activePiece[r][c]) {
                drawSquare(this.x + c, this.y + r, this.color);
            }
        }
    }
    */
}
makePiece.prototype.undraw = function() {
    this.fill(empty);
    this.shadow(empty);
/*
    for (r = 0; r < this.activePiece.length; r++) {
        for (c = 0; c < this.activePiece.length; c++) {
            if(this.activePiece[r][c]) {
                drawSquare(this.x + c, this.y + r, empty);
            }
        }
    }
    */
}


makePiece.prototype.lock = function() {
    for(r = 0; r < this.activePiece.length; r++) {
        for(c = 0; c < this.activePiece.length; c++) {
            if(!this.activePiece[r][c]) {
                continue;
            }
            //if pieces lock on top of board ( y < 0)
            if((this.y + r < 0)) {
                alert("GAME OVER");
                clearBoard();
                gameOver = true;
                drawBoard10Lines();
                break;
            }
            //lock the piece
            board[this.y + r][this.x + c] = this.color;
        }
    }
    // check if rows need to be cleared
    for(r = 0; r < rows; r++) {
        let counter = 0;
        for(c = 0; c < cols; c++) {
            if(board[r][c] != empty) {
                counter++;
                //console.log(counter);
            }
            if(counter == 10) {
                console.log("FULL ROW at: " + r);
                for(n = r; n > 1; n--) {
                    for(c = 0; c < cols; c++) {
                        console.log(board[n - 1][c]);
                        board[n][c] = board[n - 1][c];
                    }
                }
                
                for(c = 0; c < cols; c++) {
                    board[0][c] = empty;
                }
                score2++;
            }
            if(counter == 10 && r == 19) {
                gameOver = true;
                alert("YOU WIN!");
                gameOver= false;
                clearBoard();
                drawBoard10Lines();
                break;
            }
        }
        //console.log(counter);
    }
    score1++;
    piecesPlaced.innerHTML = score1;
    linesCleared.innerHTML = score2;
    drawBoard();
}

makePiece.prototype.overlapTOTAL = function(x, y, piece) {
    for(r = 0; r < piece.length; r++) {
        for(c = 0; c < piece.length; c++) {
            if(!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if(newX < 0 || newX >= cols || newY >= rows) {
                return true;
            }
            if(newY < 0) {
                continue;
            }
            if(board[newY][newX] != empty) {
                return true;
            }
        }
    }
    return false;
}
/* WROTE THESE FIRST, THEN WENT BACK AND WROTE overlapTOTAL (A combination of all 4)

makePiece.prototype.overlapDown = function(y, piece) {
    for(r = 0; r < piece.length; r++) {
        for(c = 0; c < piece.length; c++) {
            if(!piece[r][c]) {
                continue;
            }
            let newY = this.y + r + y;
            if(newY < rows) {
                continue;
            }
            else if(newY >= rows || board[newY][this.x]){
                return true;
            }
        }
    }
    return false;
}

makePiece.prototype.overlapLeft = function(x, piece) {
    for(r = 0; r < piece.length; r++) {
        for(c = 0; c < piece.length; c++) {
            if(!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            if(newX >= 0) {
                continue;
            }
            else {
                return true;
            }
        }
    }
    return false;
}

makePiece.prototype.overlapRight = function(x, piece) {
    for(r = 0; r < piece.length; r++) {
        for(c = 0; c < piece.length; c++) {
            if(!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            if(newX >= cols) {
                return true;
            }
        }
    }
    return false;
}


makePiece.prototype.overlapRotation = function(x, y, piece) {
    for(r = 0; r < piece.length; r++) {
        for(c = 0; c < piece.length; c++) {
            if(!piece[r][c]) {
                continue;
            }
            let newX = this.x + c;
            let newY = this.y + r;
            
            if(newX < 0 || newX >= cols || newY >= rows) {
                return true;
            }
            //just in case
            if(newY < 0) {
                continue;
            }
            if(board[newY][newX]) {
                //console.log("new Y:" + newY); Was keeping track of newY
                //console.log("new X:" + newX); Was keeping track of newX
                return true;
            }
        }
    }
    return false;
}
*/

makePiece.prototype.moveDown = function() {
        if(!piece.overlapTOTAL(0, 1, this.activePiece)) {
            this.undraw();
            this.y++;
            this.draw();
        }
        else {
            this.lock();
            piece = generateRandomPiece();
        }
        //console.log("y:" + this.y); Track y 
        //console.log("x:" + this.x); Track x
}

makePiece.prototype.quickDrop = function() {
    for(i = 0; i < rows; i++) {
        let m = i;
        if(piece.overlapTOTAL(0, m, this.activePiece)) {
            this.undraw();
            this.y = this.y + m - 1;
            this.draw();    
            this.lock();
            piece = generateRandomPiece();
            break;
        }
    }
}

makePiece.prototype.moveRight = function() {
    if(!piece.overlapTOTAL(1, 0, this.activePiece)) {
        this.undraw();
        this.x++;
        this.draw();
    }
}

makePiece.prototype.moveLeft = function() {
    if(!piece.overlapTOTAL(-1, 0, this.activePiece)) {
        this.undraw();
        this.x--;
        this.draw();
    }
}

makePiece.prototype.rotate = function() {
    let nextRotation = this.piece[(this.pieceN + 1) % this.piece.length];

    // console.log(nextRotation); Was checking to see if nextRotation was working properly 
    // console.log(piece.overlapRotation(0, 0, nextRotation)); Was checking if true/false
    
    let wallCheck = 0;
    if(piece.overlapTOTAL(0, 0, nextRotation)) {
        if(this.x > cols/2) {
            wallCheck = -1;
        }
        else {
            wallCheck = 1;
        }
    }

    if(!piece.overlapTOTAL(wallCheck, 0, nextRotation)) {
        this.undraw();
        this.x += wallCheck;
        this.pieceN = (this.pieceN + 1) % this.piece.length;
        this.activePiece = this.piece[this.pieceN];
        this.draw();
    }
}

document.addEventListener("keydown", CONTROL);
/*
    37. Left
    38. Up
    39. Right
    40. Down
    32. Space
*/
function CONTROL(event) {
    if(event.keyCode == 37) {
        piece.moveLeft();
        dropStart = Date.now();
    } else if(event.keyCode == 38) {
        piece.rotate();
        dropStart = Date.now();
    } else if(event.keyCode == 39) {
        piece.moveRight();
        dropStart = Date.now();
    } else if(event.keyCode == 40) {
        piece.moveDown();
    } else if(event.keyCode == 32) {
        piece.quickDrop();

    }
}

let dropStart = Date.now();
function drop() {
    let gameOver = false;
    let now = Date.now();
    let change = now - dropStart;
    if (change > 500) {
        piece.moveDown();
        dropStart = Date.now();
        //console.log(board[19][0]);
    }
    if(!gameOver) {
        requestAnimationFrame(drop);
    }
    else {
        drawBoard10Lines();
    }
}
drop();
