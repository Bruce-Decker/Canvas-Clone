import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { CREATE_PROFILE } from '../mutations/index'
import PropTypes from 'prop-types'
import Sidebar_Faculty from './Sidebar_Faculty';
import isEmpty from '../validation/isEmpty'

class CreateProfile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
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



    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e, createProfile) => {
      e.preventDefault() 
       
          createProfile().then(data => {
              console.log(data)
              window.location.reload() 
          })
       
    }

   
    
   
    render() {
      const { errors } = this.state
      const { name, email, phone_number, 
              city, country, company, school, hometown, languages, gender, about_me} = this.state
          return (
              <div>
            <Banner />
            { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
        <div className = "profileContainer">
       

    <Mutation mutation = {CREATE_PROFILE} variables = {{ name, email, phone_number,  
                                     city, country, company, school, 
                                     hometown, languages, gender, about_me }} >
        {(createProfile, { data, loading, error}) => {
           return (
            <form onSubmit = {e => {this.onSubmit(e, createProfile)}} className="ui form">
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
                { error ? <p>{error.message}</p> : null}
                <div className="space">
                
                </div>
            </form>
           )}}
             </Mutation>
        </div>
        </div>
          )
        

     
            
           
       
            

       
    }



}

CreateProfile.propTypes = {
  
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CreateProfile)