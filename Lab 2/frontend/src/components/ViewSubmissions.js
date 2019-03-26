import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';


class ViewSubmissions extends Component {
    constructor() {
        super();
        this.state = {
           submissions: []
         
        }

       
    }

    async componentDidMount() {
       const response = await axios.get('/fileUpload/upload/' + this.props.match.params.CourseId + "/" + this.props.match.params.assignmentName + "/" + this.props.auth.user.email)
       this.setState({
        submissions: response.data,
       
    })
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
              <h1> All submissions for {this.props.match.params.assignmentName}</h1>
              {  this.state.submissions.map(submission =>  
               <div class="card">
               <div class="card-body">
               <Link to ={`../../../pdf_uploads/${submission.uuid}.pdf`} target="_blank"><h2> View this PDF </h2></Link>
                 <h1> Submitted on {submission.time}</h1>
                {/* {this.props.auth.isFaculty ? <Link to = {`/ViewStudentUploadedHW/${this.props.match.params.CourseId}/${assignment.assignment_name}/${this.props.match.params.email}`}> <h3> {assignment.assignment_name}</h3></Link> :  <Link to = {`/uploadAssignment/${this.props.match.params.CourseId}/${assignment.assignment_name}/${this.props.auth.user.email}`}> <h3> {assignment.assignment_name}</h3></Link>}
                   <h1> {assignment.description}</h1> */}
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


export default connect(mapStateToProps)(ViewSubmissions)