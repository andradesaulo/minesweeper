function openSquare(square, boardCopy, boardHeight, boardWidth) {
    const line = square.line
    const column = square.column
    const adjSquares = [
        {line: line - 1, column: column - 1},
        {line: line - 1, column: column},
        {line: line - 1, column: column + 1},
        {line: line,     column: column - 1},
        {line: line,     column: column + 1},
        {line: line + 1, column: column - 1},
        {line: line + 1, column: column},
        {line: line + 1, column: column + 1}
    ]

    if (square.isClosed && !square.hasFlag) {
        //open square
        square.isClosed = false;
        
        //open adjacent squares only if no mines around
        if ((!square.hasMine) && (square.numberOfMines === 0))
            adjSquares.forEach((adjSquare) => {
                const line = adjSquare.line;
                const column = adjSquare.column;
                
                //if adjacent square not out of of board bounds
                if ((line >= 0 && line < boardHeight) && 
                (column >= 0 && column < boardWidth)) {
                    const sqr = boardCopy[line][column];
                    //try to open it
                    openSquare(sqr, boardCopy, boardHeight, boardWidth);
                }
            })
    } 
}

export { openSquare }