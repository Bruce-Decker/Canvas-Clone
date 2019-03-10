import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'

class RegisterCourse extends Component {
    constructor() {
        super();
        this.state = {
          
          
            courses: [],
            registeredCourses: []
        }
    }

    async componentDidMount() {
       
        const response = await axios.get('/showRegisterCourseInfo')
        
       // console.log(response.data)
        //console.log(this.props.auth.user.email)
        const response2 = await axios.get('/listRegisteredCourses/' + this.props.auth.user.email)
       // console.log(response2.data)
        this.setState({
            courses: response.data,
            registeredCourses: response2.data
          
           
        })
        console.log(this.state)
        //console.log("dsfdsf " + this.state.registeredCourses[0].CourseId)
       
    }

    onClick = (courseId, status) => {
        // console.log(courseId)
        // console.log(this.props.auth.user.email)
        var data = {
            email: this.props.auth.user.email,
            status: status,
            CourseId: courseId
        }
     

        axios.post('/registerCourse', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        

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
    


    render() {
      
        return (
            <div className = "pageDesign">
               <Banner />
                <Sidebar_Custom />
          
                <div className = "selectCourseContainer">
                     {  this.state.courses.map(course =>  
                     <div class="card">
                     <div class="card-body">
                          <h1>{course.CourseId} {course.CourseName} </h1>
                        
                               {/* <ListButton value = {course.CourseId} onClick = {this.onClick}/> */}
                               {this.ListButton(course.CourseId, course.status)}
                        
                          
                           
                          <div>
                             Registered students: {course.count} <br />
                             Capacity: {course.CourseCapacity} <br/>
                             Waitlist Capacity: {course.WaitlistCapacity}
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