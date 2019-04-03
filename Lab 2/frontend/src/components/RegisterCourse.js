import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'
import StickyHeader from 'react-sticky-header';

class RegisterCourse extends Component {
    constructor() {
        super();
        this.state = {
            //courses: [],
            registeredCourses: []
           
        }
    }

    async componentDidMount() {
       
        const response = await axios.get('/course/showRegisterCourseInfo3/'+ this.props.auth.user.email)
        console.log(response.data)
        
        // console.log(response.data)
        // console.log(this.props.auth.user.email)
        // const response2 = await axios.get('/listRegisteredCourses/' + this.props.auth.user.email)
       
        this.setState({
            //courses: response.data,
            registeredCourses: response.data
          
           
        })
       
        //console.log("dsfdsf " + this.state.registeredCourses[0].CourseId)
       
    }

    

    onClick = (courseId, status, faculty_email) => {
        // console.log(courseId)
        // console.log(this.props.auth.user.email)
        var data = {
            email: this.props.auth.user.email,
            
            status: status,
            CourseId: courseId,
            faculty_email: faculty_email
        }
        console.log(data)
     

        axios.post('/course/registerCourse', data)
        .then(res => window.location.reload())
        .catch(err => console.log(err))

        

    }

    ListButton = (ID, status, faculty_email) =>  {
        var found
       
      
             
           
         
    
            if (!found && status == "open") {
                return (
                    <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status, faculty_email)}> Add </button>
    
                )
            } 
            if (!found && status == "waitlist") {
                return (
                    <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status, faculty_email)}> Waitlist </button>
    
                )
            } 
        }
    


    render() {
      
        return (
            <div className = "pageDesign">
            <Banner/>
      
             
             
                <Sidebar_Custom/>
          
                <div className = "selectCourseContainer">
                
                     {  this.state.registeredCourses.map(course =>  
                     <div class="card">
                     <div class="card-body">
                          <h1>{course.CourseId} {course.CourseName}  </h1>
                        
                               {/* <ListButton value = {course.CourseId} onClick = {this.onClick}/> */}
                               {this.ListButton(course.CourseId, course.status, course.faculty_email)}
                        
                          
                           
                          <div>
                             Registered students: {course.count} <br />
                             Capacity: {course.CourseCapacity} <br/>
                             Waitlist Capacity: {course.WaitlistCapacity} <br/>
                             Faculty Email: {course.faculty_email}
                             {course.status === "closed" ? <h1> Closed </h1> : null }
                         
                            </div>
                          </div>
                          </div>

                     )}
                
                
                
                
                </div>
                
            </div>
       
             
          
        )

    }


    



}



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(RegisterCourse)