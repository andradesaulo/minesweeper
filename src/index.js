import React from 'react';
import ReactDOM from 'react-dom';
import Board from './Board';

ReactDOM.render(
    <Board minesQuantity={100} boardWidth={20} boardHeight={20} squareWidth={30}/>,
    document.getElementById("root")
)