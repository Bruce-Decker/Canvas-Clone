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

<thead>
  <tr><th>Image</th>
    <th>Name</th>
    <th>Email</th>
  </tr></thead>
<tbody>

      {this.state.students.map(student => 
       <div>
           
          <h5> {student.image_path} {student.name} {student.email}</h5>
         
         
          </div>

     )}


        </tbody>
        </table>
        </div>
            
         </div>
        )


    }
}

export default StudentSearch