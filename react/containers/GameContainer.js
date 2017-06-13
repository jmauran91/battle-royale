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
      computerScore: 0,
      playingDeck: []
    }
    this.letsBattle = this.letsBattle.bind(this);
    this.getDeck = this.getDeck.bind(this);
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

  readPlayerFaces(card){
    if (card.value === 'ACE') {
      card.value = 14;
    } else if (card.value === 'KING') {
      card.value = 13;
    } else if (card.value === 'QUEEN') {
      card.value = 12;
    } else if (card.value === 'JACK') {
      card.value = 11;
    }
  }

  readComputerFaces(card){
    if (card.value === 'ACE') {
      card.value = 14;
    } else if (card.value === 'KING') {
      card.value = 13;
    } else if (card.value === 'QUEEN') {
      card.value = 12;
    } else if (card.value === 'JACK') {
      card.value = 11;
    }
  }

  assessBattle(){
    if (this.state.computerCardValue > this.state.playerCardValue){
      this.addCompScore();
    }
    else if (this.state.computerCardValue < this.state.playerCardValue) {
      this.addPlayerScore();
    }
    else if (this.state.computerCardValue == '' && this.state.playerCardValue == ''){
    }
    else {
      this.addPlayerScore();
      this.addCompScore();
    }
  }

  componentDidMount(){
  }

  letsBattle(){
    let battle = [];
    battle = this.state.playingDeck.splice(0,2)
    this.readComputerFaces(battle[0])
    this.readPlayerFaces(battle[1])
    let compCardVal = parseInt(battle[0].value);
    let humanCardVal = parseInt(battle[1].value);
    this.setState({
      computerCardValue:  compCardVal,
      computerCardImage:  battle[0].image,
      computerCardSuit:   battle[0].suit,
      computerCardKey:    0,
      playerCardValue:    humanCardVal,
      playerCardImage:    battle[1].image,
      playerCardSuit:     battle[1].suit,
      playerCardKey:      1
    })
    this.assessBattle();
  }

  getDeck() {
    let deckFetch = [];
    let deckster = this.props.deckId;
    fetch(`https://deckofcardsapi.com/api/deck/${deckster}/draw/?count=52`)
    .then(response => response.json())
    .then(responseData => {
      responseData.cards.map((card, i) => {
        deckFetch.push(card);
      })
      this.setState({ playingDeck : deckFetch })
    })
  }
  render() {

    return(
      <div>
        <button onClick={this.getDeck}>START</button>
        <button onClick={this.letsBattle}>DRAW</button>
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
