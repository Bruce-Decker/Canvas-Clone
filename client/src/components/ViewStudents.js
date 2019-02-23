import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'


class ViewStudents extends Component {
    constructor() {
        super();
        this.state = {
            students: []
         
        }

       
    }

    async componentDidMount() {
       
        console.log(this.props.match.params.CourseId)
        const response = await axios.get('/retrieveUserProfileFromCourse/' + this.props.match.params.CourseId)
        console.log(response)
        this.setState({
            students: response.data,
       
           
        })
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
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


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(ViewStudents)