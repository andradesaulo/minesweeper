function getMines(quantity, boardWidth, boardHeight, firstSquare) {
    //Get first square position
    const line = firstSquare.line;
    const column = firstSquare.column;

    //Squares which cannot have any mines, based on first
    //square position
    const noMinesSquares = [
        {line: line - 1, column: column - 1},
        {line: line - 1, column: column},
        {line: line - 1, column: column + 1},
        {line: line,     column: column - 1},
        {line: line,     column: column},
        {line: line,     column: column + 1},
        {line: line + 1, column: column - 1},
        {line: line + 1, column: column}, 
        {line: line + 1, column: column + 1}
    ]
    
    //Array with squares indices
    let squaresIndices = Array(boardHeight * boardWidth).fill(null);
    squaresIndices = squaresIndices.map((sqr, i) => i);
    
    //Remove noMineSquares from squaresIndices
    let countRemoved = 0 //how many were removed 
    noMinesSquares.forEach((noMineSquare) => {
        const line = noMineSquare.line;
        const column = noMineSquare.column;   
        
        if ((line >= 0 && line < boardHeight) && (column  >= 0 && column < boardWidth)) {
            //countRemoved is used to remove the correct index from squaresIndices
            const squareIndex = (line * boardWidth + column) - countRemoved;
            squaresIndices.splice(squareIndex, 1);
            countRemoved++;
        }
    });
    
    //Fill mines array with random mines
    let mines = []
    for(let i = 0; i < quantity; i++) {
        const randomNumber = Math.floor(Math.random() * squaresIndices.length);
        const squareIndex = squaresIndices.splice(randomNumber, 1)[0]
        mines.push(
            {line: Math.floor(squareIndex / boardWidth),
            column: squareIndex % boardWidth}
        );
    }

    return mines;
}

export { getMines };