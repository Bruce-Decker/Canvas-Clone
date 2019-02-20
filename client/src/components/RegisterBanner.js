import React, { Component } from 'react'

class RegisterBanner extends Component {
  render() {
      return (
         <div>
                <h1 className = "welcome">
                    Welcome to 	&nbsp;
                        <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU Single Sign-on" className="logo sanjosestateuniversity_devshibbolethsp_1" />
                </h1>
                <p> Register with your San Jose State University Email to access SJSU Canvas</p>
        </div>
      )
  }

}

export default RegisterBanner;