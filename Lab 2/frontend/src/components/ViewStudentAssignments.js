import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';

class ViewStudentAssignments extends Component {
    constructor() {
        super();
        this.state = {
           assignments: []
         
        }

       
    }

    async componentDidMount() {
       
        const response = await axios.get('/assignment/listStudentAssignments/' + this.props.match.params.CourseId)
        this.setState({
            assignments: response.data,
           
        })
        console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
              {  this.state.assignments.map(assignment =>  
               <div class="card">
               <div class="card-body">
                {this.props.auth.isFaculty ? <Link to = {`/ViewStudentUploadedHW/${this.props.match.params.CourseId}/${assignment.assignment_name}/${this.props.match.params.email}`}> <h3> {assignment.assignment_name}</h3></Link> :  <Link to = {`/uploadAssignment/${this.props.match.params.CourseId}/${assignment.assignment_name}`}> <h3> {assignment.assignment_name}</h3></Link>}
                   <h1> {assignment.description}</h1>
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


export default connect(mapStateToProps)(ViewStudentAssignments)