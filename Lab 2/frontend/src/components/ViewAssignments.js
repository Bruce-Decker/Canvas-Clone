import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';

class ViewAssignments extends Component {
    constructor() {
        super();
        this.state = {
           assignments: []
         
        }

       
    }

    async componentDidMount() {
       
        const response = await axios.get('/assignment/listAssignments/' + this.props.match.params.CourseId + '/' + this.props.match.params.faculty_email)
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
                {this.props.auth.isFaculty ?  <h1> {assignment.assignment_name}</h1> :  <Link to = {`/uploadAssignment/${this.props.match.params.CourseId}/${assignment.assignment_name}`}> <h3> {assignment.assignment_name}</h3></Link>}
                   <h1> Description: {assignment.description}</h1>
                   <h3> Due date: {assignment.time}</h3>
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


export default connect(mapStateToProps)(ViewAssignments)