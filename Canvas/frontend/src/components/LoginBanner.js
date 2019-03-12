import React, { Component } from 'react'

class LoginBanner extends Component {
  render() {
      return (
        <div>
        <div className = "loginContainer">
           <h1 className = "float_class"> Login to </h1> 
                <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU Single Sign-on" className="SJSU_Logo2" />
     
      
        <p> Login with your San Jose State University Email to access SJSU Canvas</p>
        </div>
        <hr></hr>
    </div>
      )
  }

}

export default LoginBanner;
