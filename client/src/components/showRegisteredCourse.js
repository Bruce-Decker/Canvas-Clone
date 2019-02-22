import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'


class showRegisteredCourse extends Component {
    constructor() {
        super();
        this.state = {
          
          
            courses: []
        }

       
    }

    onClick = (a) => {
        console.log(a)
    }


   async componentDidMount() {
       
        const response = await axios.get('/registerCourse/' + this.props.auth.user.email)
        console.log(response.data)
        this.setState({
            courses: response.data,
          
           
        })

        console.log(this.state.courses)
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
              <div className = "registerCourseContainer">
                {this.state.courses.map(course => 
                   
                    <h1> {course.CourseId}  {course.CourseName}  <button class="ui red button drop_button" onClick={() => this.onClick(course.CourseId)}> Drop </button></h1>
                )}
                </div>
          </div>
        )
    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(showRegisteredCourse)