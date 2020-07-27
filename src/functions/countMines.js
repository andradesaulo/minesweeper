function countMines(square, board) {
    //Get square position
    const line = square.line;
    const column = square.column;
    
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

    //Count adjacent squares with mines
    let counting = 0;
    adjSquares.forEach((adjSquare) => {
        const line = adjSquare.line;
        const column = adjSquare.column;

        try {
            if (board[line][column].hasMine) counting++
        } catch(e) {}
    })
    
    return counting;
}  

export { countMines };