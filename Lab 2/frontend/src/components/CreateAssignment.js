import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { createAssignment } from '../actions/assignmentAction'

class CreateAssignment extends Component {
    constructor() {
        super();
        this.state = {
            assignment_name: '',
            description: '',
            full_points: 100,
            due_date: ''
           
        }

    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        var assignment_name = this.state.assignment_name
        var description = this.state.description
        var CourseId = this.props.match.params.CourseId
        var email = this.props.auth.user.email
        var full_points = this.state.full_points
        var time = this.state.due_date
        var data = {
            assignment_name,
            description,
            CourseId,
            full_points,
            time,
            email
        }

        this.props.createAssignment(data)
        // axios.post('/assignment/createAssignment', data)
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err))

    }


    render() {
      
        return (
            <div>
                 <Banner />
                 <Sidebar_Faculty /> 
                 <div className = "profileContainer">
                        
               
                    <h1> Create Assignment </h1>
                    <form onSubmit= {this.onSubmit}>
                    <div className="form-group">
                       
                        <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Assignment Name</label>
                        <input type="assignment_name" className="form-control" name="assignment_name"  onChange = {this.onChange}/>
                        </div>

                        <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Due Date </label>
                        <input type="assignment_name" className="form-control" name="due_date"  onChange = {this.onChange}/>
                        </div>

                        <label htmlFor="exampleFormControlInput1">Full Points</label>
                        <input style={{width:"100px"}} type="assignment_name" className="form-control" name="full_points"  onChange = {this.onChange}/>
                        </div>
                    
                    
                        <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Assignment Description</label>
                        <textarea className="form-control" name="description" rows={6} defaultValue={""} onChange = {this.onChange}/>
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


export default connect(mapStateToProps, { createAssignment })(CreateAssignment)