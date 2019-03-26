import React, { Component } from 'react';

import Key from './components/Key'
import Enter from './components/Enter'
import Clear from './components/Clear'
import './App.css';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    
  }

  clear_input = () => {
    this.setState({
      input: ''
    })
  }

  input_enter = (id) => {
     this.setState({
       input: this.state.input + id
     })
  }

  API_request = () => {
    var input = this.state.input
    var data = {
      input
    }
     var response = axios.post('/calculate', data)
         .then(res => this.setState({input: res.data}))
         .catch(err => console.log(err))
   
    
  }

  render() {
    return (
      <div className="App">
       <div className="calculator">
     
       <Enter input = {this.state.input} />
       <div className="row">
         <Clear value = "Reset" onClick = {this.clear_input}/>
       </div>
     
       <div className="row">
        
        <Key value = '7' onClick = {this.input_enter} />
        <Key value = '8' onClick = {this.input_enter} />
        <Key value = '9' onClick = {this.input_enter} />
         <Key value = '+' onClick = {this.input_enter} />
     
      
        </div>
       <div className="row">
        
        <Key value = "4" onClick = {this.input_enter}/>
        <Key value = '5' onClick = {this.input_enter}/>
        <Key value = '6' onClick = {this.input_enter}/>
        <Key value = '-' onClick = {this.input_enter}/>
        </div>
       <div className="row">
        
        <Key value = "1" onClick = {this.input_enter}/>
        <Key value = '2' onClick = {this.input_enter}/>
        <Key value = '3' onClick = {this.input_enter}/>
        <Key value = '*' onClick = {this.input_enter}/>
        </div>
       <div className="row">
        
         <Key value = "." onClick = {this.input_enter}/>
         <Key value = '0' onClick = {this.input_enter}/>
         <Key value = '=' onClick = {() => this.API_request()}/>
         <Key value = '/' onClick = {this.input_enter}/>
         </div>
         </div>
      </div>
    );
  }
}

export default App;
