import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';


class UploadAssignment extends Component {
    constructor() {
        super();
        this.state = {
            file: null

        }
         
    }

    handleFile = event => {
      
        let file = event.target.files[0]
        
        this.setState({file: file})
    }

    onSubmit = (e) => {
        var file = this.state.file
        let formdata = new FormData()
        formdata.append('assignment_name', this.props.match.params.assignmentName)
     
        formdata.append('email', this.props.auth.user.email)
        formdata.append('filename', file)
        axios.post('/upload/' + this.props.match.params.CourseId, formdata)
         .then(res => console.log(res.data))
         .catch(err => console.log(err))
        

    }

    render() {
        return (
            <div className = "pageDesign">
              <Banner />
               { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
               <div className = "registerCourseContainer">
               <div className="input-default-wrapper mt-3">
        <h1> Upload your assignment for {this.props.match.params.assignmentName}</h1>

        <form onSubmit = {this.onSubmit} className="ui form">
              <input type="file" id="file-with-current" name = "filename" className="input-default-js" onChange = {this.handleFile}/>
                <label className="label-for-default-js rounded-right mb-3" htmlFor="file-with-current">
            
                </label>
                <button class="ui primary button">
                    Upload
              </button>
        </form>
      </div>

               </div>

            </div>
        )
    }

       
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(UploadAssignment)