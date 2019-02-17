import React, { Component } from 'react';
import Login from './components/Login'
import Landing from './components/Landing'
import Register from './components/Register'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'


import './App.css';



class App extends Component {
  render() {
      return (
         <Provider store = { store }>
            <BrowserRouter>
              <div className="App">
              
                <Route exact path="/" component={Landing} />
                <div className="container">
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                  
                  </div>
              </div>
            </BrowserRouter>
         </Provider>
      
      );
  }
}

export default App;
