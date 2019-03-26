import React, { Component } from 'react';
import '../App.css'

class Clear extends Component {
    constructor(props) {
        super()
    }
    render() {
        
        return (
          <div className = "clear" onClick = {this.props.onClick}>
              {this.props.value}
          </div>
        )
    }

}

export default Clear;