import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         
          <Router>
             <Route exact path="/test" component={ Register } />
          </Router>
          
      </div>
    );
  }
}

export default App;
