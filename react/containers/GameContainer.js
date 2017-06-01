import React, { Component } from 'react';
import ComputerCardsTile from '../components/ComputerCardsTile'
import PlayerCardsTile from '../components/PlayerCardsTile'
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
    this.assessBattle = this.assessBattle.bind(this);
    this.readComputerFaces = this.readComputerFaces.bind(this);
    this.readPlayerFaces = this.readPlayerFaces.bind(this);
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

  readPlayerFaces(){
    if (this.state.playerCardValue === 'ACE') {
      this.setState({ playerCardValue: 14 })
    } else if (this.state.playerCardValue === 'KING') {
      this.setState({ playerCardValue: 13 })
    } else if (this.state.playerCardValue === 'QUEEN') {
      this.setState({ playerCardValue: 12 })
    } else if (this.state.playerCardValue === 'JACK') {
      this.setState({ playerCardValue: 11 })
    }
  }

  readComputerFaces(){
    if (this.state.computerCardValue === 'ACE') {
      this.setState({ computerCardValue: 14 })
    } else if (this.state.computerCardValue === 'KING') {
      this.setState({ computerCardValue: 13 })
    } else if (this.state.computerCardValue === 'QUEEN') {
      this.setState({ computerCardValue: 12 })
    } else if (this.state.computerCardValue === 'JACK') {
      this.setState({ computerCardValue: 11 })
    }
  }

  assessBattle(){
    if (typeof this.state.computerCardValue === 'string') {
      this.readComputerFaces();
    }
    if (typeof this.state.playerCardValue === 'string') {
      this.readPlayerFaces();
    }
    if (this.state.computerCardValue > this.state.playerCardValue){
      this.addCompScore();
    }
    else if (this.state.computerCardValue < this.state.playerCardValue) {
      this.addPlayerScore();
    }
    else {
      this.addPlayerScore();
      this.addCompScore();
    }
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
      this.assessBattle();
    })
  }


  render() {

    // let renderGameLogic = () => {
    //   if (this.state.playerCardImage != ''){
    //     return(
    //       <GamePlayContainer
    //       addPlayerScore={this.addPlayerScore}
    //       addCompScore={this.addCompScore}
    //       clearGameScore={this.clearGameScore}
    //       computer_id={this.state.computerCardKey}
    //       computerCardSuit={this.state.computerCardSuit}
    //       computerCardValue={this.state.computerCardValue}
    //       computerCardImage={this.state.computerCardImage}
    //       player_id={this.state.playerCardKey}
    //       playerCardSuit={this.state.playerCardSuit}
    //       playerCardValue={this.state.playerCardValue}
    //       playerCardImage={this.state.playerCardImage}
    //       />
    //     )
    //   }
    // }
    //


    return(
      <div>
        <button onClick={this.getPlayerCard}>DRAW</button>
        <ScoreTile
          playerScore={this.state.playerScore}
          computerScore={this.state.computerScore}
        />
        <p>computer</p>
        <ComputerCardsTile
          id={this.state.computerCardKey}
          key={this.state.computerCardKey}
          computerCardSuit={this.state.computerCardSuit}
          computerCardValue={this.state.computerCardValue}
          computerCardImage={this.state.computerCardImage}
        />
        <p>player</p>
        <PlayerCardsTile
          id={this.state.playerCardKey}
          key={this.state.playerCardKey}
          playerCardSuit={this.state.playerCardSuit}
          playerCardValue={this.state.playerCardValue}
          playerCardImage={this.state.playerCardImage}
        />
      </div>
    )
  }
}

export default GameContainer;
