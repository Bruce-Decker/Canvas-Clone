import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';


class CourseProfile extends Component {
    constructor() {
        super();
        this.state = {
        
         
        }

       
    }

    componentDidMount() {
        console.log(this.props.location.pathname)
        console.log(this.props.match.url)
        console.log(this.props.match.params.CourseId)
    
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
        { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
                <h1> <Link to ={`/ViewStudents/${this.props.match.params.CourseId}`}> View Students </Link> </h1> 
                <h1> <Link to ={`/ViewAnnouncements/${this.props.match.params.CourseId}`}> View Announcements </Link> </h1> 
             
                { this.props.auth.isFaculty ? <h1> <Link to ={`/createAssignment/${this.props.match.params.CourseId}`}> Create Assignment </Link> </h1>  : null }
                <h1> <Link to ={`/ViewAssignments/${this.props.match.params.CourseId}/${this.props.auth.user.email}`}> View Assignments </Link> </h1>
                { this.props.auth.isFaculty ? <h1> <Link to ={`/createQuiz/${this.props.match.params.CourseId}`}> Create Quiz </Link> </h1>  : null }
                <h1> <Link to ={`/viewQuizzes/${this.props.match.params.CourseId}`}> View Quizzes </Link> </h1>
                { this.props.auth.isFaculty ? null : <h1> <Link to ={`/ViewGrades/${this.props.match.params.CourseId}/${this.props.auth.user.email}`}> View Grades </Link> </h1>}
                { this.props.auth.isFaculty ? <h1> <Link to ={`/uploadCourseFile/${this.props.match.params.CourseId}`}> Upload Lectures and Files  </Link> </h1> : null}
                <h1> <Link to ={`/ListCourseFile/${this.props.match.params.CourseId}`}> View Course Files and Lectures  </Link> </h1>
             </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CourseProfile)