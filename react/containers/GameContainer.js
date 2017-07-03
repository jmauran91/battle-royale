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
      compTieOne: null,
      compTieTwo: null,
      playTieOne: null,
      playTieTwo: null,
      playerScore: 0,
      computerScore: 0,
      playingDeck: [],
      gameStatus: '',
      gameFormat: ''
    }
    this.letsBattle = this.letsBattle.bind(this);
    this.getDeck = this.getDeck.bind(this);
    this.clearGameScore = this.clearGameScore.bind(this);
    this.readComputerFaces = this.readComputerFaces.bind(this);
    this.readPlayerFaces = this.readPlayerFaces.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  clearGameScore(){
    let clearcomp = 0;
    let clearplayer = 0;
    this.setState({ computerScore: clearcomp, playerScore: clearplayer })
  }

  restartGame(){

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
    if ( this.state.playingDeck.length != 0 ){
      let battle = [];
      let tiebattle = [null, null, null, null];
      let newcomp, newplayer, gameSt, gameFo;
      battle = this.state.playingDeck.splice(0,2)
      this.readComputerFaces(battle[0])
      this.readPlayerFaces(battle[1])
      let compCardVal = parseInt(battle[0].value);
      let humanCardVal = parseInt(battle[1].value);
      if (compCardVal > humanCardVal){
        newcomp = this.state.computerScore + 1;
        newplayer = this.state.playerScore;
        gameSt = 'Computer wins round!'
        gameFo = 'cwin'
      }
      else if (humanCardVal > compCardVal) {
        newcomp = this.state.computerScore;
        newplayer = this.state.playerScore + 1;
        gameSt = 'Player wins round!';
        gameFo = 'pwin'
      }
      else if (humanCardVal == compCardVal){
        // The War 'Tie Game' dynamic is stored inside this conditional
        // Im sure there is a way to write it so that it is contained within a separate method
        // But issues with React state-setting and variable scope make that more complicated
        // than just writing it all within one method
        let tiebattle = this.state.playingDeck.splice(0,4)
        let tiebattle_num = []
        tiebattle.map((card) => {
          var cardnum = parseInt(card.value)
          tiebattle_num.push(cardnum)
        })
        if (tiebattle_num[1] > tiebattle_num[3]){
          gameSt = 'Computer wins round!'
          gameFo = 'cwin'
          newcomp = this.state.computerScore + 1;
          newplayer = this.state.playerScore;
        }
        else if (tiebattle_num[1] == tiebattle_num[3]) {

        }
        else if (tiebattle_num[1] < tiebattle_num[3]) {
          newcomp = this.state.computerScore;
          newplayer = this.state.playerScore + 1;
          gameSt = 'Player wins round!';
          gameFo = 'pwin'
        }
        else {

        }
      }
      if ( this.state.playingDeck.length == 0 && humanCardVal > compCardVal ){
        gameSt = 'Player wins game!';
        gameFo = 'pwin'
      }
      else if ( this.state.playingDeck.length == 0 && compCardVal > humanCardVal ) {
        gameSt = 'Computer wins game!';
        gameFo = 'cwin'
      }
      else if ( this.state.playingDeck.length == 0 && compCardVal == humanCardVal ){
        gameSt = 'Tie game!'
      }
      this.setState({
        computerCardValue:  compCardVal,
        computerCardImage:  battle[0].image,
        computerCardSuit:   battle[0].suit,
        computerCardKey:    0,
        computerScore:      newcomp,
        playerCardValue:    humanCardVal,
        playerCardImage:    battle[1].image,
        playerCardSuit:     battle[1].suit,
        playerCardKey:      1,
        playerScore:        newplayer,
        compTieOne:         tiebattle[0],
        compTieTwo:         tiebattle[1],
        playTieOne:         tiebattle[2],
        playTieTwo:         tiebattle[3],
        gameStatus:         gameSt,
        gameFormat:         gameFo
      })
    }
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
          gameStatus={this.state.gameStatus}
          gameFormat={this.state.gameFormat}
        />
        <p>computer</p>
        <ComputerCardsTile
          id={this.state.computerCardKey}
          key={this.state.computerCardKey}
          computerCardSuit={this.state.computerCardSuit}
          computerCardValue={this.state.computerCardValue}
          computerCardImage={this.state.computerCardImage}
          tieCardOne={this.state.compTieOne}
          tieCardTwo={this.state.compTieTwo}
        />
        <p>player</p>
        <PlayerCardsTile
          id={this.state.playerCardKey}
          key={this.state.playerCardKey}
          playerCardSuit={this.state.playerCardSuit}
          playerCardValue={this.state.playerCardValue}
          playerCardImage={this.state.playerCardImage}
          tieCardOne={this.state.playTieOne}
          tieCardTwo={this.state.playTieTwo}
        />
      </div>
    )
  }
}

export default GameContainer;
