import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'



class showRegisteredCourse extends Component {
    constructor() {
        super();
        this.state = {
          
          
            courses: [],
            listVisibility: false
        }

       
    }

    onClick = (courseId) => {
        // console.log(courseId)
        // console.log(this.props.auth.user.email)
        var data = {
            email: this.props.auth.user.email,
            CourseId: courseId
        }
     

        axios.post('/dropCourse', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        

    }



   async componentDidMount() {
       
        const response = await axios.get('/registerCourse/' + this.props.auth.user.email)
        
        this.setState({
            courses: response.data,
          
           
        })
        if (this.state.courses[0].CourseId !== null) {
           
         this.setState({
           
            listVisibility: true
           
        })
        }

       
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
              <div className = "registerCourseContainer">
               {  this.state.courses.map(course =>  
                    
                    <h1 key = {course.CourseId}> <Link to = {`/CourseProfile/${course.CourseId}`} params = {course.CourseId}> {course.CourseId}   {course.CourseName}</Link>   { this.state.listVisibility ? <ListButton value = {course.CourseId} onClick = {this.onClick}/> : null } </h1>
               
                )}
                </div>
          </div>
        )
    }

}


var ListButton = (props) => ({
    
    render: function() {
        return (
            <button className="ui red button drop_button" onClick={() => this.props.onClick(this.props.value)}> Drop </button>

        )
    }
})


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(showRegisteredCourse)