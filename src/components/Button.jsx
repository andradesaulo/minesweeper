import './Button.css';
import React from 'react';

export default props => (
    <button onMouseDown={props.onMouseDownFunction} onClick={props.onClickFunction} className={props.className}>{props.text}</button>
)