import './Board.css';
import React, { useEffect } from 'react';
import { openSquare } from '../functions/openSquare.js';
import { countMines } from '../functions/countMines.js';
import { getMines } from '../functions/getMines.js'
import Square from './Square';

export default (props) => {
    function handleClick(e, square) {
        let boardCopy = props.board.slice();
        let leftButton = e.button === 0;
        let rightButton = e.button === 2;
        let minesCopy = [];
        //condition to prevent from opening squares 
        //or putting flags after the game is over
        if (!props.result) { 
            if (leftButton) {
                if(props.firstClick) {
                    //Set mines positions
                    minesCopy = 
                        getMines(props.minesQuantity, props.boardWidth, props.boardHeight, square);
                    console.log(minesCopy);
                    minesCopy.forEach((mine) => {
                        boardCopy[mine.line][mine.column].hasMine = true;
                    })
                    props.setMines(minesCopy);

                    //Count adjacent mines
                    boardCopy.forEach((lineOfSquares,i,array) => {
                        lineOfSquares.forEach((square) => {
                            square.numberOfMines = countMines(square, array);
                        })
                    });
                    
                    props.setFirstClick(false); 
                } 

                openSquare(square, boardCopy, props.boardHeight, props.boardWidth);

                const lost =  !square.isClosed && square.hasMine;

                if (lost) {
                    props.setResult('lost');
                    props.mines.forEach((mine) => {
                        const line = mine.line;
                        const column = mine.column;
                        const square = boardCopy[line][column];
                        openSquare(square, boardCopy, props.boardHeight, props.boardWidth);
                    })
                }
            } else if ((rightButton) && (square.isClosed) && (!props.firstClick)){
                const line = square.line;
                const column = square.column;
                if (square.hasFlag) {
                    boardCopy[line][column].hasFlag = false;
                    props.setFlagsQuantity(props.flagsQuantity + 1);
                }
                else {
                    boardCopy[line][column].hasFlag = true;
                    props.setFlagsQuantity(props.flagsQuantity - 1);
                }
            }
            props.setBoard(boardCopy);
        } 
    }

    function renderSquare(square) {
        return (
            <Square 
                hasMine={square.hasMine}
                hasFlag={square.hasFlag}
                isClosed={square.isClosed}
                key={square.key}
                numberOfMines={square.numberOfMines || ''}
                onMouseUp={(e) => handleClick(e,square)}
            />
        )
    }

    useEffect(() => {
        if(props.result === '') {
            //First condition to win:
                //All mine squares flagged
            let won = true;
            if ((props.flagsQuantity >= 0) && (!props.firstClick)) {
                props.mines.forEach((mine) => {
                    const line = mine.line;
                    const column = mine.column;
                    const square = props.board[line][column];
                    if (!square.hasFlag) won = false;
                })
                if(won) props.setResult('won');
            }
            
            //Second condition to win:
                //All squares without mines opened
            won = true;
            props.board.forEach((squareLine) => 
                squareLine.forEach((square) => {
                    if (!square.hasMine && square.isClosed) won = false;
                    }
                )
            )
            if(won) props.setResult('won');
        }
    }) 

    return (
        <div className = 'board'>
                {props.board.map((lineOfSquares) => lineOfSquares.map((square) =>  renderSquare(square)))}
        </div>
    )
}