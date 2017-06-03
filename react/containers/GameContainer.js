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
      playerCardValue: null,
      playerCardImage: '',
      computerCardSuit: '',
      computerCardValue: null,
      computerCardImage: '',
      playingDeck: []
    }
    this.letsBattle = this.letsBattle.bind(this);
    this.getDeck = this.getDeck.bind(this);
    this.readComputerFaces = this.readComputerFaces.bind(this);
    this.readPlayerFaces = this.readPlayerFaces.bind(this);
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

  letsBattle(){
    let battle = [];
    // let battleVerdict;
    battle = this.state.playingDeck.splice(0,2)
    this.readComputerFaces(battle[0])
    this.readPlayerFaces(battle[1])
    // if (battle[0].value > battle[1].value){
    //   battleVerdict = 0;
    // }
    // else if (battle[1].value > battle[0].value) {
    //   battleVerdict = 1;
    // }
    // else {
    //   battleVerdict = 2;
    // }
    let playerVal = parseInt(battle[1].value)
    let compVal = parseInt(battle[0].value)
    this.setState({
      computerCardValue:  compVal,
      computerCardImage:  battle[0].image,
      computerCardSuit:   battle[0].suit,
      computerCardKey:    0,
      playerCardValue:    playerVal,
      playerCardImage:    battle[1].image,
      playerCardSuit:     battle[1].suit,
      playerCardKey:      1
    })
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
          computerCardValue= {this.state.computerCardValue}
          playerCardValue= {this.state.playerCardValue}
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
