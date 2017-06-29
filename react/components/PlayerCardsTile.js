import React, { Component } from 'react';

class PlayerCardsTile extends Component {
  constructor(props){
    super(props)
    this.state = {
    }

  }
  componentDidMount(){

  }
  render() {


    if(this.props.tieCardOne == null){
      return(
        <div>
          <img src={this.props.playerCardImage} width='130'/>
        </div>
      )
    }
    else {
      return(
        <div>
          <img src={this.props.playerCardImage} width='130'/>
          <img src="http://bit.ly/2tuDLJI" width='130'/>
          <img src={this.props.playTieTwo.image} width='130'/>
        </div>
      )
    }
  }
}

export default PlayerCardsTile;
