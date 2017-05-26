import React, { Component } from 'react';

class ComputerCardsTile extends Component {
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
        <button onClick={this.getPlayerCard}>DRAW</button>

      </div>
    )
  }
}

export default ComputerCardsTile;
