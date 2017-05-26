import React, { Component } from 'react';
import ComputerCardsTile from '../components/ComputerCardsTile'
import PlayerCardsTile from '../components/PlayerCardsTile'
import GamePlayContainer from './GamePlayContainer'
import ScoreTile from '../components/ScoreTile'

class GameContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      remaining: '',
      playerCardSuit: '',
      playerCardValue: '',
      playerCardImage: '',
      computerCardSuit: '',
      computerCardValue: '',
      computerCardImage: '',
      playerScore: 0,
      computerScore: 0
    }
    this.getPlayerCard = this.getPlayerCard.bind(this);
    this.addPlayerScore = this.addPlayerScore.bind(this);
    this.addCompScore = this.addCompScore.bind(this);
    this.clearGameScore = this.clearGameScore.bind(this);
  }

  addPlayerScore(){
    let score = this.state.playerScore + 1
    this.setState({ playerScore: score })
  }

  addCompScore(){
    let score = this.state.computerScore + 1
    this.setState({ computerScore: score })
  }

  clearGameScore(){
    let clearcomp = 0;
    let clearplayer = 0;
    this.setState({ computerScore: clearcomp, playerScore: clearplayer })
  }

  componentDidMount(){

  }

  getPlayerCard() {
    let deckster = this.props.deckId;
    fetch(`https://deckofcardsapi.com/api/deck/${deckster}/draw/?count=2`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        remaing: responseData.remaining,
        playerCardSuit: responseData.cards[0].suit,
        playerCardValue: responseData.cards[0].value,
        playerCardImage: responseData.cards[0].image,
        playerCardKey: 0,
        computerCardSuit: responseData.cards[1].suit,
        computerCardValue: responseData.cards[1].value,
        computerCardImage: responseData.cards[1].image,
        computerCardKey: 1
       })
    })
  }


  render() {

    let renderGameLogic = () => {
      if (this.state.playerCardImage != ''){
        return(
          <GamePlayContainer
          addPlayerScore={this.addPlayerScore}
          addCompScore={this.addCompScore}
          clearGameScore={this.clearGameScore}
          computer_id={this.state.computerCardKey}
          computerCardSuit={this.state.computerCardSuit}
          computerCardValue={this.state.computerCardValue}
          computerCardImage={this.state.computerCardImage}
          player_id={this.state.playerCardKey}
          playerCardSuit={this.state.playerCardSuit}
          playerCardValue={this.state.playerCardValue}
          playerCardImage={this.state.playerCardImage}
          />
        )
      }
    }



    return(
      <div>
        <button onClick={this.getPlayerCard}>DRAW</button>

        <ScoreTile
        playerScore={this.state.playerScore}
        computerScore={this.state.computerScore}
        />

        {renderGameLogic()}

      </div>
    )
  }
}

export default GameContainer;
