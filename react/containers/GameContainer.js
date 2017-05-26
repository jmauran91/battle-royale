import React, { Component } from 'react';

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
      computerCardImage: ''
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
        computerCardSuit: responseData.cards[1].suit,
        computerCardValue: responseData.cards[1].value,
        computerCardImage: responseData.cards[1].image
       })
    })
  }

  render() {



    return(
      <div>
        <button onClick={this.getPlayerCard}>DRAW</button>

      </div>
    )
  }
}

export default GameContainer;
