import React, { Component } from "react";
import propTypes from 'prop-types';
import { Link } from 'react-router-dom' 
import { connect } from 'react-redux';
import { logout  } from '../actions/authActions'

import SJSU_logo from '../public/SJSU.png';

class SideBar_Custom extends Component {
 
  LogoutButton = (e) => {
   
    
   
    this.props.logout();
  }
  

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="sidebar">
       <img className = "SJSU_image" src={SJSU_logo}/>
       <Link className = "active" to = "/showCreatedCourse"> <i className="fas fa-envelope"></i>  {this.props.auth.user.email}  </Link>
       <Link className = "active" to = "/showCreatedCourse"> <i className="fa fa-child" aria-hidden="true"></i> Faculty  </Link>
      <Link className = "active" to = "/showCreatedCourse">
   
      <i className ="fas fa-home"></i> Home
      </Link>
      <Link className="createCourse" to = "/createCourse"><i className="fas fa-graduation-cap"></i> Create  Course </Link>
      <Link to = "/searchCourse"> <i className="fas fa-book"></i> Search Course </Link>
      <Link className = "UpdateFacultyProfile" to = "/changeProfile"><i className="fas fa-user"></i> Update Profile</Link>
     
      <Link to = "viewMyProfile"> <i className="fas fa-user-circle"></i> My Profile </Link>
      <Link to = "/SendMessage"> <i className="fas fa-comment-alt"></i> Send Messages</Link>
      <Link to = "/ViewMessages"> <i className="fas fa-bell"></i> View Messages</Link>
      <Link className = "logout" to = "/" onClick = {this.LogoutButton}>
      <i className="fas fa-sign-out-alt"></i> Logout
      </Link>
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