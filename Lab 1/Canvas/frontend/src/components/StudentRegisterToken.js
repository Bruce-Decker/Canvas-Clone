import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class StudentRegisterToken extends Component {
    constructor() {
        super();
        this.state = {
          CourseId: '',
          token: ''
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
       e.preventDefault()
       var CourseId = this.state.CourseId
       var token = this.state.token
       var email = this.props.auth.user.email
       console.log(CourseId)
       console.log(token)
       var data = {
           CourseId,
           token,
           email
       }
       axios.post('/verifyCourseToken', data)
          .then(res => window.location.reload())
          .catch(err => console.log(err))
     

    }
    render() {
      
        return (
            <div> 
                <Banner />
                 <Sidebar_Custom /> 
                <div className = "studentTokenContainer">
                <h1> Add a course via token </h1>
                <form onSubmit= {this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">CourseId</label>
                            <input type="register" className="form-control" name="CourseId"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Token </label>
                            <input type="register" className="form-control" name="token"  onChange = {this.onChange}/>
                            </div>
                               
                            <button className="ui button" type="submit">Submit</button>
                   </form>

                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(StudentRegisterToken)