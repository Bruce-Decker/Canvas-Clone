import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';

import React, { Component } from 'react'


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            filename: '',
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

    onSubmit = (e) => {
        e.preventDefault()
        const user = {
            name: this.state.name,
            email: this.state.email,
            filename: this.state.filename,
            phone_number: this.state.phone_number,
            city: this.state.city,
            country: this.state.country,
            company: this.state.company,
            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages,
            gender: this.state.gender,
            about_me: this.state.about_me,

           
        }
        console.log(user)
    }
   
    render() {
      
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
                <div className="field">
                <label> Email </label>
                <input type="text" name="email" placeholder="Email"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                <label> Upload an image </label>
                <input type="file" name="filename" id="fileToUpload"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> Phone Number </label>
                  <input type="text" name="phone_number" placeholder="Phone Number"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> City </label>
                  <input type="text" name="city" placeholder="City"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> Country </label>
                  <input type="text" name="country" placeholder="Country"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> Company </label>
                  <input type="text" name="company" placeholder="Company"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> School </label>
                  <input type="text" name="school" placeholder="School"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> Hometown </label>
                  <input type="text" name="hometown" placeholder="Hometown"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> Languages </label>
                  <input type="text" name="languages" placeholder="Languages"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                  <label> Gender </label>
                  <input type="text" name="gender" placeholder="Gender"  onChange = {this.onChange}/>
                </div>
                <div className="field">
                   <label for="comment">About me:</label>
                <textarea className="form-control" name = "about_me" rows="5" id="comment"  onChange = {this.onChange}></textarea>
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

export default Profile