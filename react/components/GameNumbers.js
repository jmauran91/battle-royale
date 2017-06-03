import React from 'react';

const GameNumbers = (props) => {
  return(
    <h1> Computer Score: {props.computerScore}, Player Score: {props.playerScore}</h1>
  )
}

export default GameNumbers;
