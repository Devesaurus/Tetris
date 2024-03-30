function makePiece (piece, color) {
    this.piece = piece;
    this.pieceN = 0;
    this.activePiece = this.piece[this.pieceN];
    this.color = color;
    this.x = 3;
    this.y = -1;
}

function generateRandomPiece() {
    let p  = Math.floor(Math.random() * 17);
    
    return new makePiece(PIECES[p][0],PIECES[p][1]);
}



