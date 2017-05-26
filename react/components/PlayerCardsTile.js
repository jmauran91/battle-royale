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



    return(
      <div>
        <img src={this.props.playerCardImage} />
      </div>
    )
  }
}

export default PlayerCardsTile;
