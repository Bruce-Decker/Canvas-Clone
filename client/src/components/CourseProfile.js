import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'


class CourseProfile extends Component {
    constructor() {
        super();
        this.state = {
        
         
        }

       
    }

    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CourseProfile)