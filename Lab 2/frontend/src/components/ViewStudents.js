import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { DataTable } from 'react-data-components'




class ViewStudents extends Component {
    users1 = []
    constructor() {
        super();
        this.state = {
            students: [],
            users: []
           
         
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
        const response = await axios.get('/profile/retrieveUserProfileFromCourse/' + this.props.match.params.CourseId + '/' + this.props.match.params.faculty_email)
        
        this.setState({
            students: response.data,
       
           
        })

       
        var users2 = []
        var courseId_url = this.props.match.params.CourseId
        response.data.forEach(function(element) {
              
              
              var each_user = {
                  image: <img src = {"../../../" + element.image_path} height = "190" width = "220" key = {element.eamil}/>,
                  name: <Link to ={`/studentGradePage/${courseId_url}/${element.email}`}> {element.name} </Link>,
                  email: element.email
              }

            
              
              users2.push(each_user)
 
        })

        this.setState({
            users: users2
       
           
        })
    }

    render() {


   
      

        var columns = [
            { title: 'Image', prop: 'image'  },
            { title: 'Name', prop: 'name' },
            { title: 'Email', prop: 'email' }
          ];
         
         
      
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "tableContainer">
                {/* <table className="ui celled table">

                 { this.state.tableVisibility ? <Table /> : null }
             <tbody>

                 {this.state.students.map(student => 
                    <tr>
                       <td key = {student.eamil}><img src = {"../../../" + student.image_path} height = "190" width = "220" key = {student.eamil}/></td>
                       <td key = {student.eamil}><Link to ={`/studentGradePage/${this.props.match.params.CourseId}/${student.email}`}> {student.name} </Link> </td>
                       <td  key = {student.eamil}>{student.email}</td>
                       { this.props.auth.isFaculty ? <ListButton CourseId = {this.props.match.params.CourseId} email = {student.email} onClick = {this.onClick}/> : null }
                      
                      
                    </tr>
                   
              

              )}
           


        </tbody>
        </table> */}
      
     <DataTable
      className="container"
      keys="id"
      columns={columns}
      initialData={this.state.users}
      initialPageLength={1}
      initialSortBy={{ prop: 'name', order: 'descending' }}
      pageLengthOptions={[ 5, 20, 50 ]}

      
    />

    
    
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