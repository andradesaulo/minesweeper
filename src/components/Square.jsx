import React from 'react';
import './Square.css';
import flag from '../images/flag.png';
import mine from '../images/mine.png';

export default (props) => {
    function className() {
        let classes = 'square ';
        if (props.hasFlag) classes += 'flag ';
        if (props.isClosed) classes += 'closed ';
        return classes;
    } 

    function insideContent() {
        if (props.isClosed) {
            if (props.hasFlag) return <img src={flag} alt="flag"/>
        }
        else {
            if (props.hasMine) return <img src={mine} alt="mine"/>
            return props.numberOfMines
        }
    }

    return (
        <div 
            className = {className()} 
            onContextMenu={(e) => e.preventDefault()}
            onMouseUp={(e) => props.onMouseUp(e)}
        >
            {insideContent()}
        </div>
    )
}

