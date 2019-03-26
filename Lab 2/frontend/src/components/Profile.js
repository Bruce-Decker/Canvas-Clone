import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { createProfile } from '../actions/authActions'
import PropTypes from 'prop-types'

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            file: null,
            phone_number: '',
            city: '',
            country: '',
            company: '',
            school: '',
            hometown: '',
            languages: '',
            gender: '',
            about_me: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.errors) {
          this.setState({errors: nextProps.errors})
      }

    }

    handleFile = event => {
        console.log('uploaded')
        let file = event.target.files[0]
        
        this.setState({file: file})
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        let file = this.state.file
        let formdata = new FormData()
        formdata.append('name', this.state.name)
        formdata.append('email', this.state.email)
        formdata.append('filename', file)
        formdata.append('phone_number', this.state.phone_number)
        formdata.append('city', this.state.city)
        formdata.append('country', this.state.country)
        formdata.append('company', this.state.company)
        formdata.append('school', this.state.school)
        formdata.append('hometown', this.state.hometown)
        formdata.append('languages', this.state.languages)
        formdata.append('gender', this.state.gender)
        formdata.append('about_me', this.state.about_me)

       // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      //  console.log(this.state.file)
      console.log(formdata)
        this.props.createProfile(formdata)
        // axios.post('/profile/createProfile', formdata)
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err))
       
    }

   
    
   
    render() {
      const { errors } = this.state
          return (
              <div>
            <Banner />
            <Sidebar_Custom />
        <div className = "profileContainer">
       
            <form onSubmit = {this.onSubmit} className="ui form">
                <div className="field">
                <label> Name</label>
                <input type="text" name="name" placeholder="Name"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.name }
                                    </div>  

                <div className="field">
                <label> Email </label>
                <input type="text" name="email" placeholder="Email"  onChange = {this.onChange}/>
                </div>

                                     <div className = "inputError">
                                            {errors.email }
                                    </div> 

                <div className="field">
                <label> Upload an image </label>
                <input type="file" name="filename" id="fileToUpload"  onChange = {this.handleFile}/>
                </div>
                <div className="field">
                  <label> Phone Number </label>
                  <input type="text" name="phone_number" placeholder="Phone Number"  onChange = {this.onChange}/>
                </div>

                                    <div className = "inputError">
                                            {errors.phone_number }
                                    </div> 

                <div className="field">
                  <label> City </label>
                  <input type="text" name="city" placeholder="City"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.city }
                                    </div> 

                <div className="field">
                  <label> Country </label>
                  <input type="text" name="country" placeholder="Country"  onChange = {this.onChange}/>
                </div>

                                    <div className = "inputError">
                                            {errors.country }
                                    </div>

                <div className="field">
                  <label> Company </label>
                  <input type="text" name="company" placeholder="Company"  onChange = {this.onChange}/>
                </div>

                                    <div className = "inputError">
                                            {errors.company }
                                    </div>

                <div className="field">
                  <label> School </label>
                  <input type="text" name="school" placeholder="School"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.school }
                                    </div>

                <div className="field">
                  <label> Hometown </label>
                  <input type="text" name="hometown" placeholder="Hometown"  onChange = {this.onChange}/>
                </div>

                                    <div className = "inputError">
                                            {errors.hometown }
                                    </div>

                <div className="field">
                  <label> Languages </label>
                  <input type="text" name="languages" placeholder="Languages"  onChange = {this.onChange}/>
                </div>


                                    <div className = "inputError">
                                            {errors.languages }
                                    </div>

                <div className="field">
                  <label> Gender </label>
                  <input type="text" name="gender" placeholder="Gender"  onChange = {this.onChange}/>
                </div>

                                   <div className = "inputError">
                                            {errors.gender }
                                    </div>

                <div className="field">
                   <label for="comment">About me:</label>
                <textarea className="form-control" name = "about_me" rows="5" id="comment"  onChange = {this.onChange}></textarea>
                </div>

                                  <div className = "inputError">
                                            {errors.about_me }
                                    </div>
                
                <div className="field">
                
                </div>
                <button className="ui button" type="submit">Submit</button>
                <div className="space">
                
                </div>
            </form>
        </div>
        </div>
          )
        

     
            
           
       
            

       
    }



}

Profile.propTypes = {
  
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, {createProfile})(Profile)