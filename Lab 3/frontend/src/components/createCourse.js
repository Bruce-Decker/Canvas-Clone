import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { CREATE_COURSE } from '../mutations/index'


class createCourse extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            CourseId: '',
            CourseName: '',
            CourseDept: '',
            CourseDescription: '',
            CourseRoom: '',
            CourseCapacity: '',
            WaitlistCapacity: '',
            CourseTerm: '',
            errors: {}
        }


    }

    textField = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e, createCourse) => {
        e.preventDefault()
      
       
       
        createCourse().then(data => {
            console.log(data)
            window.location.reload()
            
        })




    }

    render() {
      
        const email = this.props.auth.user.email
        const { CourseId, CourseName, CourseDept, 
            CourseDescription, CourseRoom, CourseCapacity, WaitlistCapacity, CourseTerm } = this.state

        return (
            <div>
                <Banner />
                <Sidebar_Faculty />
                <div className = "pageContainer">
                    <h1> Create Course </h1>


            <Mutation mutation = {CREATE_COURSE} variables = {{ email, CourseId, CourseName, CourseDept, CourseDescription, CourseRoom, CourseCapacity, WaitlistCapacity, CourseTerm }}>
                  {(createCourse, { data, loading, error}) => {
                      return (
                    <form onSubmit = {e => {this.onSubmit(e, createCourse)}} className="ui form">
                        <div className="field">
                        <label> Course ID </label>
                        <input type="text" name="CourseId" placeholder= "Course ID"  onChange = {this.textField}/>
                        </div>
                        <div className="field">
                        <label> Course Name </label>
                        <input type="text" name="CourseName" placeholder="Course Name"  onChange = {this.textField}/>
                        </div>
                       
                        <div className="field">
                            <label> Course Department </label>
                            <input type="text" name="CourseDept" placeholder="Course Department"  onChange = {this.textField}/>
                        </div>
                        {/* <div className="ui form">
                              <div className="field">
                             <label>Course Description</label>
                              <textarea  name="CourseDescription"  onChange = {this.textField}></textarea>
                             </div>
                          </div>
                          <div className="field">
                          
                          </div> */}
                        
                        <div className="field">
                            <label> Course Description </label>
                            <input type="text" name="CourseDescription" placeholder="Course Description"  onChange = {this.textField}/>
                        </div>
                        <div className="field">
                            <label> Course Room </label>
                            <input type="text" name="CourseRoom" placeholder="Course Room"  onChange = {this.textField}/>
                        </div>
                        <div className="field">
                            <label> Course Capacity </label>
                            <input type="text" name="CourseCapacity" placeholder="Course Capacity"  onChange = {this.textField}/>
                        </div>
                        <div className="field">
                            <label> Waitlist Capacity </label>
                            <input type="text" name="WaitlistCapacity" placeholder="Waitlist Capacity"  onChange = {this.textField}/>
                        </div>
                        <div className="field">
                            <label> Course Term </label>
                            <input type="text" name="CourseTerm" placeholder="Course Term"  onChange = {this.textField}/>
                        </div>
                        
                       
                        
                        <div className="field">
                        
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                        { error ? <p>{error.message}</p> : null}
                        <div className="space">
                        
                        </div>
                    </form>
                      )}}
                      </Mutation>
               </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})



export default connect(mapStateToProps)(createCourse);
