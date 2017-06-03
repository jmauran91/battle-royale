import React from 'react';
import GameNumbers from './GameNumbers';

class ScoreTile extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      playerScore: 0,
      computerScore: 0
    }

    this.augPlayer = this.augPlayer.bind(this);
    this.augComputer = this.augComputer.bind(this);
    this.assessHand = this.assessHand.bind(this);
  }

  augPlayer(){
    let player = this.state.playerScore + 1
    this.setState({ playerScore: player })
  }

  augComputer(){
    debugger;
    let computer = this.state.computerScore + 1
    this.setState({ computerScore: computer })
  }

  assessHand() {
    if(this.props.computerCardValue > this.props.playerCardValue) {
      this.augComputer();
    } else if(this.props.computerCardValue < this.props.playerCardValue) {
      this.augPlayer();
    } else {
      null;
    }
  }

  componentDidMount(){
    this.assessHand();
    // if (this.props.battleDeterminer == 0) {
    //   this.augPlayer();
    // }
    // else if (this.props.battleDeterminer == 1) {
    //   this.augComputer();
    // }
    // else {
    //   this.augPlayer();
    //   this.augComputer();
    // }
  }

  render(){
    return(
      <div>
        <GameNumbers
          computerScore= {this.state.computerScore}
          playerScore= {this.state.playerScore}
        />
      </div>
    )
  }
}

export default ScoreTile;
