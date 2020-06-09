import React, {useState} from 'react';
import Square from './Square';
import './Board.css';

function uniqueRandNumbers(arrayLength, howMany) {
    let tempArray = Array(arrayLength).fill(1).map((item, i) => item * i);
    const array = Array(howMany).fill(null);
    
    return array.map(() => {
        let randomNumber = Math.floor(Math.random() * tempArray.length);
        let removed = tempArray.splice(randomNumber, 1)[0];
        return removed;
    });
}

export default () => {
    const [gameSize] = useState(10);
    const [squares] = useState(Array(Math.pow(gameSize,2)).fill(1));
    squares.map((value, index) => value * index);
    const [bombs] = useState(uniqueRandNumbers(Math.pow(gameSize,2), 10));
    
    function renderSquare(i) {
        if (bombs.includes(i)) {
            return (
                <Square 
                    hasBomb={true}
                    key={i}
                />
            )
        } else {
            return (
                <Square 
                    key={i}
                    numberOfBombs={countBombs(i)}
                />
            )
        }
    }

    function countBombs(i) {
        let adjBlocks = [
            i - gameSize - 1, i - gameSize, i - gameSize + 1,
            i - 1,                          i + 1,
            i + gameSize - 1, i + gameSize, i + gameSize + 1];

        let count = 0;

        function compareAndCount(value) {if (bombs.includes(value)) count++}
            
        //top squares
        if (i >= 0 && i <= gameSize - 1) {
            //top leftmost square
            if (i === 0) {
                adjBlocks.forEach((value, index) => {
                    if ([4,6,7].includes(index) ) compareAndCount(value)
                })
            } 
            //top rightmost square
            else if (i === gameSize - 1) {
                adjBlocks.forEach((value, index) => {
                    if ([3,5,6].includes(index)) compareAndCount(value)
                })
            }
            //any else top square
            else {
                adjBlocks.forEach((value, index) => {
                    if ([3,4,5,6,7].includes(index)) compareAndCount(value)
                })
            }
        } 
        //bottom squares
        else if (i >= (gameSize * gameSize) - gameSize && 
                 i <= (gameSize * gameSize) - 1) {
            //bottom leftmost square
            if (i === (gameSize * gameSize) - gameSize) {
                adjBlocks.forEach((value, index) => {
                    if ([1,2,4].includes(index)) compareAndCount(value)
                })
            }
            //bottom rightmost square
            else if (i === (gameSize * gameSize) - 1) {
                adjBlocks.forEach((value, index) => {
                    if ([0,1,3].includes(index) ) compareAndCount(value)
                })
            }
            //any else bottom square
            else {
                adjBlocks.forEach((value, index) => {
                    if ([0,1,2,3,4].includes(index)) compareAndCount(value)}
                )}
        }  
        //leftmost squares         
        else if (i % gameSize === 0) {
            adjBlocks.forEach((value, index) => {
                if ([1,2,4,6,7].includes(index)) compareAndCount(value)
            })
        } 
        //rightmost squares
        else if (i % gameSize === gameSize - 1) {
            adjBlocks.forEach((value, index) => {
                if ([0,1,3,5,6].includes(index)) compareAndCount(value)
            })
        }
        //any else square
        else {
            adjBlocks.forEach((value) => compareAndCount(value))
        }
        
        return count || '';
    }

    return (
        <div className = 'board'>
            {squares.map((item, i) => renderSquare(i))}
        </div>
    )
}