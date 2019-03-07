import React, { Component } from "react";
import propTypes from 'prop-types';
import { Link } from 'react-router-dom' 
import { connect } from 'react-redux';
import { logout  } from '../actions/authActions'
import { resetProfile } from '../actions/userProfileAction'
import SJSU_logo from '../public/SJSU.png';

class SideBar_Custom extends Component {
 
  LogoutButton = (e) => {
   
    
    this.props.resetProfile();
    this.props.logout();
  }
  

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="sidebar">
       <img className = "SJSU_image" src={SJSU_logo}/>
      <Link className = "active" to = "/showRegisteredCourse">  <i className ="fas fa-home"></i> Home </Link>
      <Link className="registerCourse" to = "/registerCourse"> <i className="fas fa-graduation-cap"></i> Register Courses </Link>
      <Link to = "/searchCourse"> <i className="fas fas fa-book"></i> Search Course </Link>
      <Link className = "profile" to = "/profile"> <i className="fas fa-user"></i> Update Profile</Link>
      <Link to = "/viewMyProfile"> <i className="fas fa-user-circle"></i> My Profile </Link>
     
      <Link className = "logout" to = "/" onClick = {this.LogoutButton}> <i className="fas fa-sign-out-alt"></i> Logout </Link>
    </div>
    )
  }
}

SideBar_Custom.propTypes = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})
 
export default connect(mapStateToProps, { logout, resetProfile })(SideBar_Custom);