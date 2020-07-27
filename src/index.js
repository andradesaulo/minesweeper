import React from 'react';
import ReactDOM from 'react-dom';
import MineSweeper from './components/MineSweeper';

ReactDOM.render(
    <MineSweeper boardWidth={20} boardHeight={20}/>,
    document.getElementById("root")
)