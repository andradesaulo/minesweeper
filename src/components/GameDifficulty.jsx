import React from 'react';
import Button from './Button.jsx'
export default (props) => {
    return (
        <div className = 'gameDifficulty'>
            <Button 
                text={'Easy'}
                onMouseDownFunction=
                    {(e) => {e.button === 0 && props.setDifficulty('easy')}}
                className={props.difficulty === 'easy' && 'selected'}
            />
            <Button 
                text={'Medium'}
                onMouseDownFunction=
                    {(e) => {e.button === 0 && props.setDifficulty('medium')}}
                className={props.difficulty === 'medium' && 'selected'}
            />
            <Button 
                text={'Hard'}
                onMouseDownFunction=
                    {(e) => {e.button === 0 && props.setDifficulty('hard')}}
                className={props.difficulty === 'hard' && 'selected'}
            />
        </div>
    )
}