import React, { Component } from 'react'
import SJSU_logo from '../public/sjsu-logo.png';
import background_image from '../public/background.jpg'
import Banner from './Banner'
import { Link } from 'react-router-dom' 


class Landing extends Component {
 
 
  render() {
      return (
          <div> 
            <nav>
        <div className="nav-wrapper blue">
          <h1 className="brand-logo"> 
            <div className = "logo"><img className = "SJSU2_image" src={SJSU_logo}/></div>
          </h1>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li> <Link to = "/login"> Student Login </Link> </li>
          <li> <Link to = "/FacultyLogin"> Faculty Login </Link> </li>
          <li> <Link to = "/register"> Register </Link> </li>
            {/* <li><a href="sass.html">Student Login</a></li>
            <li><a href="badges.html">Faculty Login</a></li>
            <li><a href="collapsible.html">Register</a></li> */}
          </ul>
        </div>


      </nav>
      <div className="landingcontainer">
      <img className = "landingImage" src={background_image} />
 
  <div className="centered">
        <h1 className="playfairFont "> SJSU Canvas  <i class="far fa-copy"></i></h1> 
        <h1 className = "lobster"> Upload assignments and download lectures with ease</h1>
       
         
  </div>
</div>
      

             
          </div>
      )
  }

}

export default Landing;