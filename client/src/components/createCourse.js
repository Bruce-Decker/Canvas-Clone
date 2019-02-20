import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'

class createCourse extends Component {

    constructor() {
        super();
        this.state = {
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

    onSubmit = (e) => {
       
        var CourseId = this.state.CourseId
        var CourseName = this.state.CourseName
        var CourseDept = this.state.CourseDept
        var CourseDescription = this.state.CourseDescription
        var CourseRoom = this.state.CourseRoom
        var CourseCapacity = this.state.CourseCapacity
        var WaitlistCapacity = this.state.WaitlistCapacity
        var CourseTerm = this.state.CourseTerm
        var data = {
            CourseId: CourseId,
            CourseName: CourseName,
            CourseDept: CourseDept,
            CourseDescription: CourseDescription,
            CourseRoom: CourseRoom,
            CourseCapacity: CourseCapacity,
            WaitlistCapacity: WaitlistCapacity,
            CourseTerm: CourseTerm
        }
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        axios.post('/createCourse', data)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))

    }

    render() {
        return (
            <div>
                <Banner />
                <Sidebar_Custom />
                <div className = "pageContainer">
                    <h1> Create Course </h1>
                    <form onSubmit = {this.onSubmit} className="ui form">
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
                        <div className="space">
                        
                        </div>
                    </form>
               </div>
            </div>
        )
    }
}


export default createCourse;
