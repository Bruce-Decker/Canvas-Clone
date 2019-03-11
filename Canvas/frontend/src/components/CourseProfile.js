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
              <div className = "showCourseContainer">
            
                    <h1><Link to ={`/ViewStudents/${this.props.match.params.CourseId}`}><i className="fas fa-address-book"></i> View Students </Link> </h1> 
                    <h1> <Link to ={`/ViewAnnouncements/${this.props.match.params.CourseId}`}><i className="fas fa-bullhorn"></i> View Announcements </Link> </h1> 
                
                    { this.props.auth.isFaculty ? <h1> <Link to ={`/createAssignment/${this.props.match.params.CourseId}`}><i className="far fa-file-alt"></i> Create Assignment </Link> </h1>  : null }
                    <h1> <Link to ={`/ViewAssignments/${this.props.match.params.CourseId}/${this.props.auth.user.email}`}><i className="fas fa-file-alt"></i> View Assignments </Link> </h1>
                    { this.props.auth.isFaculty ? <h1> <Link to ={`/createQuiz/${this.props.match.params.CourseId}`}><i className="fas fa-pen"></i> Create Quiz </Link> </h1>  : null }
                    <h1> <Link to ={`/viewQuizzes/${this.props.match.params.CourseId}`}><i className="fas fa-pen-square"></i> View Quizzes </Link> </h1>
                    { this.props.auth.isFaculty ? null : <h1> <Link to ={`/ViewGrades/${this.props.match.params.CourseId}/${this.props.auth.user.email}`}> <i className="fas fa-archive"></i> View Grades </Link> </h1>}
                    { this.props.auth.isFaculty ? <h1> <Link to ={`/uploadCourseFile/${this.props.match.params.CourseId}`}><i className="fas fa-upload"></i> Upload Lectures and Files  </Link> </h1> : null}
                    <h1> <Link to ={`/ListCourseFile/${this.props.match.params.CourseId}`}> <i className="fas fa-chart-bar"></i> View Course Files and Lectures  </Link> </h1>
                    { this.props.auth.isFaculty ? <h1> <Link to ={`/FacultyGenerateToken/${this.props.match.params.CourseId}`}><i className="fas fa-key"></i> Generate Token  </Link> </h1> : null}
               
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