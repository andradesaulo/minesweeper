import React, {useState} from 'react';
import './Square.css';

export default (props) => {
    const [hasFlag, setHasFlag] = useState(false);
    const [hasBomb] = useState(props.hasBomb)
    const [isCovered, setIsCovered] = useState(true);
    
    function className() {
        let name = 'square ';
        if (hasFlag) name += 'flag ';
        if (isCovered) name += 'covered ';
        return name;
    } 

    function onMouseUp(e) {
        if (e.button === 0 && !hasFlag) setIsCovered(false);
        if (isCovered && e.button === 2) {
            if (hasFlag) setHasFlag(false); 
            else setHasFlag(true);
        }
    }

    function insideContent() {
        if (isCovered) {
            if (hasFlag) return <img src={require('./flag.png')} alt=""/>
        }
        else {
            if (hasBomb) return <img src={require('./mine.png')} alt=""/>
            else return props.numberOfBombs
        }
    }

    return (
        <div 
            className = {className()} 
            onContextMenu={(e) => e.preventDefault()}
            onMouseUp={(e) => onMouseUp(e)}
        >
            {insideContent()}
        </div>
    )
}

