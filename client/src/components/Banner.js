import React, { Component } from 'react'

class Banner extends Component {
  render() {
      return (
          <div className = "auth okta-container">
          
            <div className="applogin-banner">
            <div className="applogin-background"></div>
            <div className="applogin-container">
                <h1>
                    Welcome to  <div className="applogin-app-logo">  
                        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU Single Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1" /></div>
                </h1>
                <p>Connect to Canvas at Anytime</p>
            </div>
         </div>
       </div>
      )
  }

}

export default Banner;
