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
        <img src={this.props.computerCardImage} width='130' />
      </div>
    )
  }
}

export default ComputerCardsTile;
