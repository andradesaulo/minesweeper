function getBoard(boardWidth, boardHeight) {
    function getSquareObject(line, column) {
        return (
            {   
                line: line,
                column: column,
                key: line * boardWidth + column,
                hasFlag: false,
                isClosed: true,
            }
        )
    }

    //Get an empty board
    let board  = Array(boardHeight).fill(Array(boardWidth).fill(null));

    //Fill the board
    board = 
        board.map((lineOfSquares, line) => 
            lineOfSquares.map((square, column) => 
                getSquareObject(line, column)
            )
        );
    
    return board;
}

export { getBoard }