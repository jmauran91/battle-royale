import React, { Component } from 'react';
import GameContainer from './containers/GameContainer';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      gameToggle: false,
      deckId: null,
      remaining: null
    }
    this.handleGameToggleClick = this.handleGameToggleClick.bind(this);
  }

  componentWillMount(){
    this.getNewDeck();
  }

  handleGameToggleClick() {
    if (this.state.gameToggle === false) {
      this.setState({
        gameToggle: true
      })
    }
  }

  getNewDeck(){
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        deckId: responseData.deck_id,
        remaining: responseData.remaining
       })
    })
  }

  render() {

     let renderGame;
     if (this.state.gameToggle) {
       renderGame = () => {
          return(
            <GameContainer
              remaining={this.state.remaining}
              deckId={this.state.deckId}
            />
          )
        }
      } else {
        renderGame = () => {
           return(
             <p> </p>
           )
         }
      }


    return(
      <div className="main_div">
        <h1 className="main_header">Welcome to Battle Royale</h1>
        <p className="subheader">Get ready to battle</p>
        <div className="felt_table">
          <button className="battle_button" onClick={this.handleGameToggleClick}>BATTLE</button>
          <div className="render_div">
          {renderGame()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
