import React from 'react';
import './Square.css';

export default (props) => {
    const colors = ["#3452eb", "#03a800", "#c45500", "#fbff00", "#bd009a", "#00969c", "#eb343d", "black"]
    function className() {
        let name = 'square ';
        if (props.hasFlag) name += 'flag ';
        if (props.isCovered) name += 'covered ';
        return name;
    } 

    function insideContent() {
        if (props.isCovered) {
            if (props.hasFlag) return <img style={{width: '20px'}} src={require('./flag.png')} alt=""/>
        }
        else {
            if (props.hasMine) return <img style={{width: '20px'}}src={require('./mine.png')} alt=""/>
            else return props.numberOfMines
        }
    }

    return (
        <div 
            className = {className()} 
            onContextMenu={(e) => e.preventDefault()}
            onMouseUp={(e) => props.onMouseUp(e)}
            style = {(props.hasFlag || props.hasMine) ? 
                {lineHeight: 1, width: props.squareWidth, height: props.squareWidth} : 
                {color: colors[props.numberOfMines - 1], width: props.squareWidth, height: props.squareWidth}}
        >
            {insideContent()}
        </div>
    )
}

