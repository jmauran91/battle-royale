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
        <img src={this.props.playerCardImage} width='130'/>
      </div>
    )
  }
}

export default PlayerCardsTile;
