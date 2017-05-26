import React, { Component } from 'react';
import ComputerCardsTile from '../components/ComputerCardsTile'
import PlayerCardsTile from '../components/PlayerCardsTile'

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



    return(
      <div>
        <button onClick={this.getPlayerCard}>DRAW</button>
        <ComputerCardsTile
        id={this.state.computerCardKey}
        key={this.state.computerCardKey}
        computerCardSuit={this.state.computerCardSuit}
        computerCardValue={this.state.computerCardValue}
        computerCardImage={this.state.computerCardImage}
        />
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
