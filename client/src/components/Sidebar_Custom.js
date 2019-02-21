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
      <Link className = "active" to = "/">
   
         Home
      </Link>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
      <Link className = "logout" to = "/" onClick = {this.LogoutButton}>
   
         Logout
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
 
export default connect(mapStateToProps, { logout, resetProfile })(SideBar_Custom);