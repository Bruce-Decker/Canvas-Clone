import React, { Component } from 'react'

class Banner extends Component {
  render() {
      return (
        <div className = "bannerContainer">
        <div className = "loginContainer">
           <h1 className = "float_class"> Canvas at</h1> 
                <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs0amebisreoB7xDi0x7" alt="SJSU Single Sign-on" className="SJSU_Logo2"></img>
      
        <p>  Access SJSU Canvas at Anytime using your SJSU email</p>
        </div>
        <hr></hr>
    </div>
      )
  }

}

export default Banner;
