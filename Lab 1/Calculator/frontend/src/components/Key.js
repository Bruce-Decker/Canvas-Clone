import React, { Component } from 'react'
import '../App.css'


class Key extends Component {
    constructor(props) {
        super()
        this.state = {
            isSymbol: false
           
        }
        
    }

    componentDidMount() {
        console.log(this.props.children)
        
        if (this.props.value === "." || this.props.value === "=" || this.props.value === '+' || this.props.value === '-' || this.props.value === '/' || this.props.value === '*') {
            this.setState({
                isSymbol: true
            })
         } else {
             this.setState({
                 isSymbol: false
             })
         }
    }

    render() {
        
        return (
          
             <div>
                {this.state.isSymbol ? <div className = "button" onClick={() => this.props.onClick(this.props.value)}> {this.props.value} </div>: <div className = "symbol" onClick={() => this.props.onClick(this.props.value)}> {this.props.value} </div> }
            </div>
           
        )

    }

   

}

export default Key;