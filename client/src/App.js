import React, { Component } from 'react';
import Login from './components/Login'
import Landing from './components/Landing'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

class App extends Component {
  render() {
      return (
       
        <BrowserRouter>
          <div className="App">
           
            <Route exact path="/" component={Landing} />
            <div className="container">
                <Route exact path="/login" component={Login} />
               
              </div>
          </div>
        </BrowserRouter>
      
      );
  }
}

export default App;
