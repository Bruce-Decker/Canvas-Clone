import React, { Component } from 'react';
import Login from './components/Login'
import Landing from './components/Landing'
import Register from './components/Register'
import Profile from './components/Profile'
import jwt_decode from 'jwt-decode'
import tokenHeader from './utility/tokenHeader'
import { activeUser } from './actions/authActions'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'


import './App.css';

if (localStorage.token) {
  tokenHeader(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(activeUser(decoded));
}



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
                    <Route exact path="/profile" component={Profile} />
                  
                  </div>
              </div>
            </BrowserRouter>
         </Provider>
      
      );
  }
}

export default App;
