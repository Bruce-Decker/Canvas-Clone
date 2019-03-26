import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import StudentList from './StudentList'

class StudentSearch extends Component {
   
    constructor() {
        super();
        this.state = {
            CourseId: '',
            tableVisibility: false,
            students: []
        }


    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state.CourseId)
    }

    onSubmit = async e => {
        e.preventDefault();
        var CourseId = this.state.CourseId
       
      
       const response = await axios.get('/retrieveUserProfileFromCourse/' + this.state.CourseId)
         
      
      console.log(response.data)

      this.setState({
        students: response.data,
        tableVisibility: true
       
    })
    
       
    }

   
    


    render() {
        return (
         <div className = "pageDesign">
                <Banner />
                <Sidebar_Custom />
                <div className = "pageContainer">
                    <h1> Search for All Students in this course </h1>
                    <form onSubmit = {this.onSubmit} className="ui form">
                        <div className="field">
                        <label> Course ID </label>
                        <input type="text" name="CourseId" placeholder= "Course ID"  onChange = {this.onChange}/>
                        </div>
                        <button className="ui button" type="submit">Submit</button>
                        <div className="space">
                        
                        </div>
                      
                        
                        
                    </form>
                   
                </div>
             <div className = "tableContainer">
                <table className="ui celled table">

                 { this.state.tableVisibility ? <Table /> : null }
             <tbody>

                 {this.state.students.map(student => 
                    <tr>
                       <td key = {student.eamil}><img src = {"../../" + student.image_path} height = "190" width = "190" key = {student.eamil}/></td>
                       <td key = {student.eamil}>{student.name}</td>
                       <td key = {student.eamil}>{student.email}</td>

                    </tr>
                 
              

              )}


        </tbody>
        </table>
        </div>
            
         </div>
        )


    }
}

var Table = () => ({
    render: function() {
        return (
            <thead>
            <tr>
                <th>Profile Image</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            </thead>

        )
    }
})

export default StudentSearch