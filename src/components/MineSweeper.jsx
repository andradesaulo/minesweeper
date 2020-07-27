import './MineSweeper.css';
import React, {useState, useEffect} from 'react';
import { getBoard } from '../functions/getBoard.js';
import { getMinesQuantity } from '../functions/getMinesQuantity.js';
import GameDifficulty from './GameDifficulty';
import GameFlags from './GameFlags';
import Board from './Board';
import Button from './Button'

export default (props) => {
    const [difficulty, setDifficulty] = useState('easy');
    const [firstClick, setFirstClick] = useState(true);
    const [boardWidth] = useState(props.boardWidth);
    const [boardHeight] = useState(props.boardHeight);
    const [mines, setMines] = useState([]);
    const [flagsQuantity, setFlagsQuantity] = useState(getMinesQuantity(difficulty));
    const [board, setBoard] = useState(getBoard(boardWidth, boardHeight));
    const [result, setResult] = useState('');

    function restart() {
        setFirstClick(true);
        setMines([]);
        setFlagsQuantity(getMinesQuantity(difficulty));
        setBoard(getBoard(boardWidth, boardHeight));
        setResult('');
    }

    useEffect(() => {
        setFirstClick(true);
        setMines([]);
        setFlagsQuantity(getMinesQuantity(difficulty));
        setBoard(getBoard(boardWidth, boardHeight));
        setResult('');
    }, [difficulty])

    
    return (
        <div className = 'container'>
            <h1>Minesweeper {result && `- You ${result}!`}</h1>
            <Board
                board={board}
                setBoard={setBoard}
                boardWidth={boardWidth}
                boardHeight={boardHeight}
                firstClick={firstClick}
                setFirstClick={setFirstClick}
                mines={mines}
                setMines={setMines}
                minesQuantity={getMinesQuantity(difficulty)}
                flagsQuantity={flagsQuantity}
                setFlagsQuantity={setFlagsQuantity}
                result={result}
                setResult={setResult}
            />
            <div className={'sideMenu'}>
                <GameFlags 
                    flagsQuantity={flagsQuantity}
                />
                <GameDifficulty 
                    setDifficulty={setDifficulty}
                    difficulty={difficulty}
                />
                <hr/>
                <Button
                    text={'Restart'}
                    onClickFunction={(e) => {e.button === 0 && restart()}}
                />
            </div>
        </div>
    )
}