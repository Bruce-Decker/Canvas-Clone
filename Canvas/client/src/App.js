import React, { Component } from 'react';
import Login from './components/Login'
import FacultyLogin from './components/FacultyLogin'
import Landing from './components/Landing'
import Register from './components/Register'
import Profile from './components/Profile'
import UpdateFacultyProfile from './components/UpdateFacultyProfile'
import createCourse from './components/createCourse'
import StudentSearch from './components/StudentsSearch'
import CourseProfile from './components/CourseProfile'
import ViewAnnouncements from './components/ViewAnnouncements'
import showRegisteredCourse from './components/showRegisteredCourse'
import showCreatedCourse from './components/showCreatedCourse'
import RegisterCourse from './components/RegisterCourse'
import CreateAssignment from './components/CreateAssignment'
import ViewAssignments from './components/ViewAssignments'
import ViewStudents from './components/ViewStudents'
import CreateQuiz from './components/CreateQuiz'
import TakeQuiz from './components/TakeQuiz'
import ViewQuizzes from './components/ViewQuizzes'
import UploadAssignment from './components/UploadAssignment'
import jwt_decode from 'jwt-decode'
import tokenHeader from './utility/tokenHeader'
import { activeUser, activeFaculty } from './actions/authActions'
import { logout } from './actions/authActions'
import { resetProfile } from './actions/userProfileAction'

import Test from './components/ShowPDF'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'
import SecureRoutes  from './components/SecureRoutes'


import './App.css';

if (localStorage.token) {
  tokenHeader(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  
  console.log(decoded)
  if (localStorage.getItem('isFaculty') == 'yes') {
    store.dispatch(activeFaculty(decoded));
    

  } else {
    
    store.dispatch(activeUser(decoded));
  }
 
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
                    <Route exact path="/facultyLogin" component={FacultyLogin} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Switch>
                       <SecureRoutes exact path="/createCourse" component={createCourse} />
                    </Switch>

                    <Route exact path="/createAssignment/:CourseId" component={CreateAssignment} />
                    <Route exact path="/createQuiz/:CourseId" component={CreateQuiz} />
                    <Route exact path="/viewQuizzes/:CourseId" component={ViewQuizzes} />
                    <Route exact path="/takeQuiz/:CourseId/:quizName" component={TakeQuiz} />
                    <Route exact path="/ViewAssignments/:CourseId" component={ViewAssignments} />
                     
                    <Route exact path="/studentSearch" component={StudentSearch} />
                    <Route exact path="/showRegisteredCourse" component={showRegisteredCourse} />
                    <Route exact path="/showCreatedCourse" component={showCreatedCourse} />
                    <Route exact path="/registerCourse" component={RegisterCourse} />
                    <Route exact path = "/updateFacultyProfile" component = {UpdateFacultyProfile} />
                   
                    <Route exact path="/courseProfile/:CourseId" component={CourseProfile} />
                    <Route exact path="/viewStudents/:CourseId" component={ViewStudents} />
                    <Route exact path="/ViewAnnouncements/:CourseId" component={ViewAnnouncements} />
                    <Route exact path="/uploadAssignment/:CourseId/:assignmentName" component={UploadAssignment} />
                    <Route exact path="/test" component={Test} />
                   
                
              </div>
            </BrowserRouter>
         </Provider>
      
      );
  }
}

export default App;
