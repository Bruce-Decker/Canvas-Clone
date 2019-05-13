
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './components/Landing'
import Register from './components/Register'
import FacultyLogin from './components/FacultyLogin'
import ShowCreatedCourse from './components/showCreatedCourse'
import ShowRegisteredCourse from './components/showRegisteredCourse'
import RegisterCourse from './components/RegisterCourse'
import CreateCourse from './components/createCourse'
import Login from './components/Login'
import jwt_decode from 'jwt-decode'
import { Provider } from 'react-redux';
import store from './store'
import './App.css';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { activeUser} from './actions/authActions'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  fetchOptions: {
      credentials: 'include'
  },
  request: operation => {
      const jwtToken = localStorage.getItem('jwtToken')
     
      operation.setContext({
          headers: {
              authorization: jwtToken
          }
      })
  },
  onError: ({ networkError}) => {
      if (networkError) {
          console.log('Network Error', networkError)
          localStorage.removeItem('jwtToken')
      }
     
  }
})


if (localStorage.jwtToken) {
  if (localStorage.getItem('jwtToken') == "undefined") {
    localStorage.removeItem('jwtToken')
  }
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(activeUser(decoded));
  console.log(decoded)
  
}

class App extends Component {

  render() {
    return (
      <ApolloProvider client = {client}>
      <Provider store = { store }>
      <BrowserRouter>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/facultyLogin" component={FacultyLogin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/showCreatedCourse" component={ShowCreatedCourse} />
            <Route exact path="/createCourse" component={CreateCourse} />
            <Route exact path="/showRegisteredCourse" component={ShowRegisteredCourse} />
            <Route exact path="/registerCourse" component={RegisterCourse} />
         
            </div>
            </BrowserRouter>
            </Provider>
   </ApolloProvider>

    )
}
}

export default App;
