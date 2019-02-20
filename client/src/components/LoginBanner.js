import React, { Component } from 'react'

class LoginBanner extends Component {
  render() {
      return (
        <div>
        <div className = "loginContainer">
           <h1 className = "float_class"> Login to </h1> 	&nbsp;
                <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU Single Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1" />
     
      
        <p> Login with your San Jose State University Email to access SJSU Canvas</p>
        </div>
    </div>
      )
  }

}

export default LoginBanner;
