import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';


class SearchCourse extends Component {
    constructor() {
        super();
        this.state = {
        
          SearchByCourseId: null,
          SearchByCourseName: null,
          SearchByCourseValue: null,
          didSubmit: false,
          Courses: [],
          toggle: false
   
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    } 

    onClick = (courseId, status) => {
        var data = {
            email: this.props.auth.user.email,
            status: status,
            CourseId: courseId
          
        }
        console.log("onclick id " + courseId)
        console.log("status " + status)
        axios.post('/registerCourse', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        // axios.post('/registerCourse', data)
        // .then(res => this.componentDidMount())
        // .catch(err => console.log(err))

    }

    onSubmit = (e) => {
       e.preventDefault()
       this.setState({
         Courses: []
       })
      
        if (this.state.SearchByCourseId) {
          
            var data = {
                id: this.state.SearchByCourseId
            }
           axios.post('/searchCoursebyID', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  

        if (this.state.SearchByCourseName) {
          
            var data = {
                courseName: this.state.SearchByCourseName
            }
           axios.post('/searchCoursebyName', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  

        if (this.state.SearchByCourseValue) {
          
            var data = {
                CourseId: this.state.SearchByCourseValue
            }
           axios.post('/searchCoursebyValue', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  
    
    }

    helper = (response) => {
        console.log("response " + JSON.stringify(response.data[0]))
        this.setState({
            courses: response.data,
            didSubmit: true,
            toggle: true
        })
       
      
      }

      ListButton = (ID, status) =>  {
        var found
       
        this.state.registeredCourses.forEach(function(element) {
             
             if (element.CourseId == ID) {
                 found = true
             }
         })
    
            if (!found && status == "open") {
                return (
                    <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status)}> Add </button>
    
                )
            } 
            if (!found && status == "waitlist") {
                return (
                    <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status)}> Waitlist </button>
    
                )
            } 
        }

    async componentDidMount() {
        const response2 = await axios.get('/listRegisteredCourses/' + this.props.auth.user.email)
       // console.log(response2.data)
        this.setState({
          
            registeredCourses: response2.data
          
           
        })
      
    }

    render() {
     
        return (
           
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "profileContainer">
              <form onSubmit = {this.onSubmit} className="ui form">
                <div className="field">
                <label> Search By CourseId</label>
                <input type="text" name="SearchByCourseId" placeholder="CourseId" value = {this.state.SearchByCourseId} onChange = {this.onChange}/>
                </div>

                <div className="field">
                <label> Search By Course Name</label>
                <input type="text" name="SearchByCourseName" placeholder="Course Name" value = {this.state.SearchByCourseName} onChange = {this.onChange}/>
                </div>

                <div className="field">
                <label> Search By Value</label>
                <input type="text" name="SearchByCourseValue" placeholder="Course Value" value = {this.state.SearchByCourseValue} onChange = {this.onChange}/>
                </div>
               
                <div className="field">
                
                </div>
                <button className="ui button" type="submit">Submit</button>
                <div className="space">
                
                </div>
            </form>

          {this.state.toggle ? <div>
             {this.state.didSubmit ?  
             <div>
                 {  this.state.courses.map(course =>  
              
                    <div class="card">
                    <div class="card-body">
                 
                        <h3 className = "BreeSerif"> {course.CourseId} {course.CourseName}</h3>
                        <h3 className = "BreeSerif"> Instructor email: {course.email} </h3>
                        <h3 className = "BreeSerif"> Course Description: {course.CourseDescription} </h3>
                        <h3 className = "BreeSerif"> Course Room: {course.CourseRoom} </h3>
                        <h3 className = "BreeSerif"> Course Capacity: {course.CourseCapacity} </h3>
                        <h3 className = "BreeSerif"> Course Waitlist Capacity: {course.WaitlistCapacity} </h3>
                        <h3 className = "BreeSerif"> Course Term: {course.CourseTerm} </h3>
                        <h3 className = "BreeSerif"> Status: {course.status} </h3>
                       

                        {/* <button className="ui button blue" type="submit" onClick = {() => this.onClick(course.CourseId)}> Register </button> */}
                        {this.ListButton(course.CourseId, course.status)}
                    </div>
                    </div>
                  
                

                )}  </div>: null}
               </div>
                : null}

                
        
            </div>
            </div>
        )


   }
}





const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(SearchCourse)