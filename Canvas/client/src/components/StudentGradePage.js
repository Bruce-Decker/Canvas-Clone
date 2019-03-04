import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';


class StudentGradePage extends Component {
    constructor() {
        super();
        this.state = {
        
         
        }
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
             
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
              <h1> <Link to ={`/ViewProfile/${this.props.match.params.email}`}> View Profile </Link> </h1> 
            
              <h1> <Link to ={`/ViewStudentGrades/${this.props.match.params.CourseId}/${this.props.match.params.email}`}> View Grades </Link> </h1> 
              <h1> <Link to ={`/ViewAssignments/${this.props.match.params.CourseId}/${this.props.match.params.email}`}> View Uploaded Assignments </Link> </h1>


              </div>


            </div>
        )


   }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(StudentGradePage)