import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'

class RegisterCourse extends Component {
    constructor() {
        super();

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


export default connect(mapStateToProps)(RegisterCourse)