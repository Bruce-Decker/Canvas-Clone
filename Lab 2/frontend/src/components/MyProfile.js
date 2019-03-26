import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';
import PDF from 'react-pdf-js';
import ShowPDF from './ShowPDF'


class MyProfile extends Component {
    constructor() {
        super();
        this.state = {
           about_me: '',
           city: '',
           company: '',
           country: '',
           email: '',
           gender: '',
           hometown: '',
           image_path: '',
           languages: '',
           name: '',
           phone_number: '',
           school: ''
         
        }

       
    }

    async componentDidMount() {
       
        const response = await axios.get('/profile/viewProfile/' + this.props.auth.user.email)
        this.setState({
            about_me: response.data[0].about_me,
            city: response.data[0].city,
            company: response.data[0].company,
            email: response.data[0].email,
            gender: response.data[0].gender,
            hometown: response.data[0].hometown,
            image_path: response.data[0].image_path,
            languages: response.data[0].languages,
            name: response.data[0].name,
            phone_number: response.data[0].phone_number,
            school: response.data[0].school,
        })
       
        console.log(response.data)
      
       
    }


    render() {
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
                 <div className = "lobster">
                 <img src = {this.state.image_path} height = "190" width = "220" />
                     <h3 className = "BreeSerif"> Name <i className="fas fa-user"></i> : {this.state.name} </h3>
                     <h3 className = "BreeSerif">  Email <i className="fas fa-envelope-square"></i> : { this.state.email} </h3>
                     <h3 className = "BreeSerif">  Phone Number <i className ="fas fa-phone"></i> : {this.state.phone_number} </h3>
                     <h3 className = "BreeSerif">  Gender: {this.state.gender} </h3>
                     <h3 className = "BreeSerif">    Company <i className="far fa-building"></i> : {this.state.company} </h3>
                     <h3 className = "BreeSerif"> City <i className="fas fa-city"></i> : {this.state.city} </h3>
                     <h3 className = "BreeSerif"> Hometown: {this.state.hometown} </h3>
                     <h3 className = "BreeSerif"> School <i className="fas fa-university"></i> : {this.state.school} </h3>
                     <h3 className = "BreeSerif"> Languages <i className="fas fa-language"></i> : {this.state.languages} </h3>
                     <h3 className = "BreeSerif"> About Me: {this.state.about_me} </h3>
                 </div>
                 <div className = "extra_space">

                 </div>
             </div>
            </div>

        )
    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(MyProfile) 