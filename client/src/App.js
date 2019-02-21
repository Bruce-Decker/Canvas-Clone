import React, { Component } from 'react';
import Login from './components/Login'
import Landing from './components/Landing'
import Register from './components/Register'
import Profile from './components/Profile'
import createCourse from './components/createCourse'
import StudentSearch from './components/StudentsSearch'
import jwt_decode from 'jwt-decode'
import tokenHeader from './utility/tokenHeader'
import { activeUser } from './actions/authActions'
import { logout } from './actions/authActions'
import { resetProfile } from './actions/userProfileAction'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'
import SecureRoutes  from './components/SecureRoutes'


import './App.css';

if (localStorage.token) {
  tokenHeader(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  store.dispatch(activeUser(decoded));
  const time_now = Date.now() / 1000;
  if (decoded.exp < time_now) {
     store.dispatch(resetProfile())
     store.dispatch(logout())
     window.location.href = '/'
  }
}



class App extends Component {
  render() {
      return (
         <Provider store = { store }>
            <BrowserRouter>
              <div className="App">
              
                <Route exact path="/" component={Landing} />
               
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Switch>
                       <SecureRoutes exact path="/createCourse" component={createCourse} />
                    </Switch>
                    <Route exact path="/studentSearch" component={StudentSearch} />
                  
                
              </div>
            </BrowserRouter>
         </Provider>
      
      );
  }
}

export default App;
