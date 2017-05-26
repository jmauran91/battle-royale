import React from 'react';

class ScoreTile extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <h1> Player Score: {this.props.playerScore}, Computer Score: {this.props.computerScore} </h1>
      </div>
    )
  }
}

export default ScoreTile;
