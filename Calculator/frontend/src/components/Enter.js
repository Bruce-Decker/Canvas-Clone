import React, { Component } from 'react';
import '../App.css'

class Enter extends Component {
    constructor(props) {
        super()
    }
    render() {
        
        return (
          <div className = "enter">
             <h3 className = "enterText"> {this.props.input} </h3>
          </div>
        )
    }

}

export default Enter;