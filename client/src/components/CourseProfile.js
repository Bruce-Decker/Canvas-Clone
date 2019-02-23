import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CourseProfile extends Component {
    constructor() {
        super();
        this.state = {
        
         
        }

       
    }

    componentDidMount() {
        console.log(this.props.location.pathname)
        console.log(this.props.match.url)
        console.log(this.props.match.params.CourseId)
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
              <div className = "registerCourseContainer">
                <h1> <Link to ={`/ViewStudents/${this.props.match.params.CourseId}`}> View Students </Link> </h1> 
             </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CourseProfile)