import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'



class showCreatedCourse extends Component {
    constructor() {
        super();
        this.state = {
          
          
            courses: [],
            listVisibility: false
        }

      

      

       
    }




    async componentDidMount() {
       
        const response = await axios.get('/createCourse/' + this.props.auth.user.email)
        this.setState({
            courses: response.data,
          
           
        })
    console.log(this.state.courses)
       
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
              <div className = "registerCourseContainer">
                 {  this.state.courses.map(course =>  

                     <h1 key = {course.CourseId}> <Link to = {`/CourseProfile/${course.CourseId}`} params = {course.CourseId}> {course.CourseId}   {course.CourseName}</Link>  </h1>
               
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


export default connect(mapStateToProps)(showCreatedCourse)