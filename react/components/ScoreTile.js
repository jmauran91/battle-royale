import React from 'react';

class ScoreTile extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <h1> {this.props.gameStatus} </h1>
        <h1> Computer Score: {this.props.computerScore}, Player Score: {this.props.playerScore}</h1>
      </div>
    )
  }
}

export default ScoreTile;
