import React, { Component } from 'react';
import '../App.css'

class Enter extends Component {
    constructor(props) {
        super()
    }
    render() {
        
        return (
          <div className = "enter">
             {this.props.input}
          </div>
        )
    }

}

export default Enter;