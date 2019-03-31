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
import ViewGrades from './components/ViewGrades'
import ViewStudentGrades from './components/ViewStudentGrades'
import StudentGradePage from './components/StudentGradePage'
import ViewStudents from './components/ViewStudents'
import ViewStudentUploadedHW from './components/ViewStudentUploadedHW'
import ViewStudentAssignments from './components/ViewStudentAssignments'
import CreateQuiz from './components/CreateQuiz'
import TakeQuiz from './components/TakeQuiz'
import ViewQuizzes from './components/ViewQuizzes'
import UploadAssignment from './components/UploadAssignment'
import ViewSubmissions from './components/ViewSubmissions'


import UploadCourseFile from './components/UploadCourseFile'
import ViewEachCourseFile from './components/ViewEachCourseFile'
import ViewStudentProfile from './components/ViewStudentProfile'
import ViewMyProfile from './components/MyProfile'
import SearchCourse from './components/SearchCourse'

import FacultyGenerateToken from './components/FacultyGenerateToken'
import StudentRegisterToken from './components/StudentRegisterToken'

import ListCourseFiles from './components/ListCourseFiles'
import jwt_decode from 'jwt-decode'
import tokenHeader from './utility/tokenHeader'
import { activeUser, activeFaculty } from './actions/authActions'
import { logout } from './actions/authActions'
import { resetProfile, activeProfile } from './actions/userProfileAction'
import {  activeCourse } from './actions/courseAction'

import Test from './components/ShowPDF'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store'
import SecureRoutes  from './components/SecureRoutes'


import SendMessage from './components/SendMessage'
import ViewMessages from './components/ViewMessages'
import ViewExchangedMessages from './components/ViewExchangedMessages'


import './App.css';

if (localStorage.token) {
  if (localStorage.getItem('token') == "undefined") {
    localStorage.removeItem('token')
  }
  tokenHeader(localStorage.token)
  const decoded = jwt_decode(localStorage.token)
  
  console.log(decoded)
  if (localStorage.getItem('isFaculty') == 'yes') {
    decoded.token = localStorage.getItem('token')
    store.dispatch(activeFaculty(decoded));
    

  } else {
    decoded.token = localStorage.getItem('token')
    store.dispatch(activeUser(decoded));
  }
 
  const time_now = Date.now() / 1000;
  if (decoded.exp < time_now) {
     store.dispatch(resetProfile())
     store.dispatch(logout())
     
     window.location.href = '/'
  }
}

if (localStorage.profile) {
 
    var profile = localStorage.getItem('profile')
    profile = JSON.parse(profile)
    store.dispatch(activeProfile(profile))
  

}

if (localStorage.course) {
 
    var course = localStorage.getItem('course')
    course = JSON.parse(course)
    store.dispatch(activeCourse(course))
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
                    <Route exact path="/viewQuizzes/:CourseId/:faculty_email" component={ViewQuizzes} />
                    <Route exact path="/takeQuiz/:CourseId/:quizName/:faculty_email" component={TakeQuiz} />
                    <Route exact path="/ViewAssignments/:CourseId/:faculty_email" component={ViewAssignments} />
                    <Route exact path="/ViewSubmissions/:CourseId/:assignmentName" component={ViewSubmissions} />

                    <Route exact path = "/ViewGrades/:CourseId/:email" component = {ViewGrades} />
                    <Route exact path = "/ViewStudentGrades/:CourseId/:email" component = {ViewStudentGrades} />
                    <Route exact path = "/studentGradePage/:CourseId/:email" component = {StudentGradePage} />
                    <Route exact path = "/viewstudentProfile/:email" component = {ViewStudentProfile} />
                    <Route exact path = "/viewMyProfile" component = {ViewMyProfile} />


                     
                    <Route exact path="/studentSearch" component={StudentSearch} />
                    <Route exact path="/showRegisteredCourse" component={showRegisteredCourse} />
                    <Route exact path="/showCreatedCourse" component={showCreatedCourse} />
                    <Route exact path="/registerCourse" component={RegisterCourse} />
                    <Route exact path = "/updateFacultyProfile" component = {UpdateFacultyProfile} />



                   
                    <Route exact path="/courseProfile/:CourseId/:faculty_email" component={CourseProfile} />
                    <Route exact path="/viewStudents/:CourseId/:faculty_email" component={ViewStudents} />
                    <Route exact path="/ViewAnnouncements/:CourseId/:faculty_email" component={ViewAnnouncements} />
                    <Route exact path="/uploadAssignment/:CourseId/:assignmentName" component={UploadAssignment} />
                    <Route exact path="/uploadCourseFile/:CourseId" component={UploadCourseFile} />
                    <Route exact path="/listCourseFile/:CourseId/:faculty_email" component={ListCourseFiles} />
                    <Route exact path="/viewEachCourseFile/:CourseId/:faculty_email/:item_name" component={ViewEachCourseFile} />

                    <Route exact path="/searchCourse" component={SearchCourse} />
                  
                    <Route exact path="/ViewStudentAssignments/:CourseId/:email" component={ViewStudentAssignments} />
                    <Route exact path="/ViewStudentUploadedHW/:CourseId/:assignmentName/:email" component={ViewStudentUploadedHW} />

                    <Route exact path="/FacultyGenerateToken/:CourseId" component={FacultyGenerateToken} />
                    <Route exact path="/StudentRegisterToken" component={StudentRegisterToken} />
                    <Route exact path = "/SendMessage" component = {SendMessage} />
                    <Route exact path = "/ViewMessages" component = {ViewMessages} />
                    <Route exact path = "/ViewExchangedMessages/:receiver_email/:sender_email/:subject" component = {ViewExchangedMessages} />

                    <Route exact path="/test" component={Test} />
                   
                
              </div>
            </BrowserRouter>
         </Provider>
      
      );
  }
}

export default App;
