import React, {useState} from 'react';
import Square from './Square';
import './Board.css';
import { useEffect } from 'react';

function getMines(quantity, boardWidth, boardHeight, firstSquare) {
    //Get first square position
    const line = parseInt(firstSquare.id / boardWidth);
    const column = firstSquare.id % boardWidth;

    //Squares which cannot have any mines based on first
    //square position
    const noMinesSquares = [
        [line - 1, column - 1], [line - 1, column], [line - 1, column + 1],
        [line, column - 1],     [line, column],     [line, column + 1],
        [line + 1, column - 1], [line + 1, column], [line + 1, column + 1],
    ]
    
    //Array with squares ids
    let squaresIds = Array(boardHeight * boardWidth).fill(null).map((value, i) => i);
    
    //Remove noMineSquares ids from squaresIds
    let countRemoved = 0 //how many ids were removed 
    noMinesSquares.forEach((pos) => {
        const line = pos[0];
        const column = pos[1];   
        
        if ((line >= 0 && line < boardHeight) && (column  >= 0 && column < boardWidth)) {
            const id = line * boardWidth + column - countRemoved;
            squaresIds.splice(id, 1);
            countRemoved++;
        }
    });
    
    //Fill mines array with random mines
    let mines = []
    for(let i = 0; i < quantity; i++) {
        const randomNumber = Math.floor(Math.random() * squaresIds.length);
        mines.push(squaresIds.splice(randomNumber, 1)[0]);
    }
    
    return mines;
}

function countMines(square, board, boardWidth) {
    //Get square position
    const line = parseInt(square.id / boardWidth);
    const column = square.id % boardWidth;
    
    const adjSquares = [
        [line - 1, column - 1], [line - 1, column], [line - 1, column + 1],
        [line, column - 1],                         [line, column + 1],
        [line + 1, column - 1], [line + 1, column], [line + 1, column + 1]
    ]

    //Count adjacent squares with mines
    let counting = 0;
    adjSquares.forEach((value) => {
        const line = value[0];
        const column = value[1];

        try {
            if (board[line][column].hasMine) counting++
        } catch(e) {}
    })
    
    return counting;
}  

function getAssembledBoard(boardWidth, boardHeight) {
    function getSquareObject(id) {
        return (
            {   
                id: id,
                key: id,
                hasFlag: false,
                isCovered: true,
            }
        )
    }

    //Initialize squares with null values
    let squares = Array(boardHeight * boardWidth).fill(null);

    //Get a square object for each null value
    squares = squares.map((square, id) => getSquareObject(id))

    //Get an empty board
    const emptyBoard  = Array(boardHeight).fill(Array(boardWidth).fill(null));

    //Fill the board
    const board = 
        emptyBoard.map((line, i) => 
            line.map((column, j) => 
                squares[i * boardWidth + j]
            )
        );
    
    return board;
}

export default (props) => {
    const [firstClick, setFirstClick] = useState(true);
    const [boardWidth] = useState(props.boardWidth);
    const [boardHeight] = useState(props.boardHeight);
    const [mines, setMines] = useState([]);
    const [board, setBoard] = useState(getAssembledBoard(boardWidth, boardHeight));
    const [result, setResult] = useState();
    const [contagem, setContagem] = useState(0);

    function openUp(square) {
        const line = parseInt(square.id / boardWidth);
        const column = square.id % boardWidth;
        const adjSquares = [
            [line - 1, column - 1], [line - 1, column], [line - 1, column + 1],
            [line, column - 1],                 [line, column + 1],
            [line + 1, column - 1], [line + 1, column], [line + 1, column + 1]
        ]
        
        const boardCopy = board.slice();
        
        if (square.isCovered && !square.hasFlag) {
            
            //open square
            boardCopy[line][column].isCovered = false;
            
            //open adjacent squares only if no mines around
            
            if (!square.hasMine) {
                
                if (square.numberOfMines === 0)
                
                adjSquares.forEach((square) => {
                    const line = square[0];
                    const column = square[1];
                    
                    //if adjacent square not out of of board bounds
                    if ((line >= 0 && line < boardHeight) && 
                    (column >= 0 && column < boardWidth)) 
                        
                    //try to open it
                    openUp(board[line][column]);
                })
            }
        } 
        return boardCopy;
    }
    
    function gameIsOver() {

    }
    function handleClick(e, square) {
        let boardCopy = board.slice();
        let minesCopy = mines.slice();
        let firstClickCopy = firstClick;
        let resultCopy = result;
        if (e.button === 0) {
            if (firstClick) {
                minesCopy = getMines(props.minesQuantity, boardWidth, boardHeight, square);
                
                //Set mines positions
                boardCopy =  
                    boardCopy.map((lineOfSquares) => {
                        return lineOfSquares.map((square) => {
                            if (minesCopy.includes(square.id)) {
                                square.hasMine = true
                            }
                            return square
                    })
                });
    
                //Count adjacent mines
                boardCopy =  
                    boardCopy.map((lineOfSquares,i,array) => {
                        return lineOfSquares.map((square) => {
                            square.numberOfMines = countMines(square, array, array[0].length);
                            return square
                    })
                });
    
                firstClickCopy = false;
            } 
            boardCopy = openUp(square);
            if (!square.isCovered && square.hasMine) {
                resultCopy = 'lost';
                minesCopy.forEach((mine) => {
                    const line = parseInt(mine / boardWidth);
                    const column = mine % boardWidth;
                    boardCopy = openUp(boardCopy[line][column]);
                })
            }
        } else if (e.button === 2) {
            const line = parseInt(square.id / boardWidth);
            const column = square.id % boardWidth;
            if (square.hasFlag) {
                boardCopy[line][column].hasFlag = false;
            }
            else {
                boardCopy[line][column].hasFlag = true;
            }
        }

        setMines(minesCopy);
        setBoard(boardCopy);
        setFirstClick(firstClickCopy);

    }
    
    function renderSquare(square) {
        return (
            <Square 
            hasMine={square.hasMine}
            hasFlag={square.hasFlag}
            isCovered={square.isCovered}
            key={square.key}
            numberOfMines={square.numberOfMines || ''}
            onMouseUp={(e) => handleClick(e,square)}
            squareWidth={props.squareWidth}
            />
        )
    }

    return (
        <div className = 'board' style = {{width: props.squareWidth * props.boardWidth}}>
        {board.map((line) => line.map((square) =>  renderSquare(square)))}
    </div>
    )
}