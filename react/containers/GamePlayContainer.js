import React from 'react';
import PlayerCardsTile from '../components/PlayerCardsTile'
import ComputerCardsTile from '../components/ComputerCardsTile'

class GamePlayContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      computerCardValue: null,
      playerCardValue: null

    }

    this.assessBattle = this.assessBattle.bind(this);
  }

  assessBattle(){
    if (this.props.computerCardValue > this.props.playerCardValue){
      this.props.addCompScore();
    }
    else if (this.props.computerCardValue == this.props.playerCardValue) {
      this.tieDraw();
    }
    else {
      this.props.addPlayerScore();
    }
  }

  componentWillMount(){
    this.setState({ computerCardValue: this.props.computerCardValue,
                    playerCardValue: this.props.playerCardValue})
    this.assessBattle();

  }


  tieDraw(){

  }


  render(){

    return(
      <div>
      <ComputerCardsTile
      computerCardImage={this.props.computerCardImage}
      computerCardValue={this.props.computerCardValue}
      computerCardSuit={this.props.computerCardSuit}
      />

      <PlayerCardsTile
      playerCardImage={this.props.playerCardImage}
      playerCardValue={this.props.playerCardValue}
      playerCardSuit={this.props.playerCardSuit}
      />
      </div>
    )
  }
}

export default GamePlayContainer;
