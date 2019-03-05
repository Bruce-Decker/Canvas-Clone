import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'


class ViewStudents extends Component {
    constructor() {
        super();
        this.state = {
            students: []
         
        }

       
    }

    onClick = (courseId, email) => {
        console.log(courseId)
        console.log(email)
        var data = {
            email: email,
            CourseId: courseId
        }
        axios.post('/dropCourse', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        

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
                       <td key = {student.eamil}><img src = {"../../" + student.image_path} height = "190" width = "220" key = {student.eamil}/></td>
                       <td key = {student.eamil}><Link to ={`/studentGradePage/${this.props.match.params.CourseId}/${student.email}`}> {student.name} </Link> </td>
                       <td  key = {student.eamil}>{student.email}</td>
                       <ListButton CourseId = {this.props.match.params.CourseId} email = {student.email} onClick = {this.onClick}/>
                      
                      
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

var ListButton = (props) => ({
    
    render: function() {
        return (
            <button className="ui red button drop_button" onClick={() => this.props.onClick(this.props.CourseId, this.props.email)}> Drop Student </button>

        )
    }
})



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(ViewStudents)