import React, { Component } from 'react';

class GameContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      computersHand: []
    }
  }


  componentDidMount(){
    this.getComputerDeck();
  }

  getComputerDeck() {
    let deckster = this.props.deckId;
    fetch(`https://deckofcardsapi.com/api/deck/${deckster}/draw/?count=26`)
    .then(response => response.json())
    .then(responseData => {
      debugger;
      this.setState({

       })
    })
  }

  render() {



    return(
      <div>
        <p>hi</p>
      </div>
    )
  }
}

export default GameContainer;
