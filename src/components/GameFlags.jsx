import './GameFlags.css';
import React from 'react';
import flag from '../images/flag.png'

function showFlagsQuantity(quantity) {
    if (quantity >= 0 && quantity < 10) {
        return '0' + quantity;
    } else if (quantity > -10 && quantity < 0) {
        return '-0' + Math.abs(quantity);
    } return quantity;
}

export default(props) => 
    <p className = 'gameFlags'>
        {showFlagsQuantity(props.flagsQuantity)}
        <img src={flag} alt="flags"/>
    </p>
