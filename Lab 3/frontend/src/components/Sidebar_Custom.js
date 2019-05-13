import React, { Component } from "react";
import propTypes from 'prop-types';
import { Link } from 'react-router-dom' 
import { connect } from 'react-redux';
import { logout  } from '../actions/authActions'

import SJSU_logo from '../public/SJSU.png';

class SideBar_Custom extends Component {
 
  LogoutButton = (e) => {
   
    
    this.props.resetProfile();
    this.props.logout();
    this.props.resetCourse();
  }
  

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="sidebar">
       <img className = "SJSU_image" src={SJSU_logo}/>
       <Link className = "active" to = "/showRegisteredCourse"> <i className="fas fa-envelope"></i>  {this.props.auth.user.email}  </Link>
       <Link className = "active" to = "/showRegisteredCourse"> <i className="fa fa-child" aria-hidden="true"></i> Student  </Link>
      <Link className = "active" to = "/showRegisteredCourse">  <i className ="fas fa-home"></i> Home </Link>
      <Link className="registerCourse" to = "/registerCourse"> <i className="fas fa-graduation-cap"></i> Register Courses </Link>
      <Link to = "/searchCourse"> <i className="fas fas fa-book"></i> Search Course </Link>
      <Link to = "/StudentRegisterToken"> <i className="fas fa-key"></i> Register Via Token </Link>
      <Link className = "profile" to = "/profile"> <i className="fas fa-user"></i> Update Profile</Link>
      <Link to = "/viewMyProfile"> <i className="fas fa-user-circle"></i> My Profile </Link>
      <Link to = "/SendMessage"> <i className="fas fa-comment-alt"></i> Send Messages</Link>
      <Link to = "/ViewMessages"> <i className="fas fa-bell"></i> View Messages</Link>
     
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
 
export default connect(mapStateToProps, { logout })(SideBar_Custom);