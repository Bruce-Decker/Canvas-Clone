import React, { Component } from 'react'

class LoginBanner extends Component {
  render() {
      return (
          <div className = "auth okta-container">
          
            <div className="applogin-banner">
            <div className="applogin-background"></div>
            <div className="applogin-container">
                <h1>
                    Connecting to<div className="applogin-app-logo">
                        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU Single Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1" /></div>
                </h1>
                <p>Sign-in with your San Jose State University account to access SJSU Single Sign-on</p>
            </div>
         </div>
       </div>
      )
  }

}

export default LoginBanner;
