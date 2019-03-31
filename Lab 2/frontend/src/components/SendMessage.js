import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';
import Sidebar_Custom from './Sidebar_Custom'



class SendMessage extends Component {
    constructor(props, context) {
        super(props, context);
       

        this.state = {

            receiver_email: '',
            subject: '',
            message: ''
            
        }
       
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
       e.preventDefault()
       var receiver_email = this.state.receiver_email
       var sender_email = this.props.auth.user.email
       var subject = this.state.subject
       var message = this.state.message
     
       var data = {
           receiver_email,
           sender_email,
           subject,
           message
       }
       console.log(data)
       axios.post('/message/sendMessage', data)
          .then(res => window.location.reload())
          .catch(err => console.log(err))
     

    }

  
    


    render() {
       

        return (
            <div className = "pageDesign">
              <Banner />
            
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
                   
                 <h1> Send a message </h1>
                 <div className="ui form">
            <form id="messageForm" onSubmit= {this.onSubmit}>
            <div className="field">
            <div className="field">
            <label> To </label>
              <textarea rows="2" name = "receiver_email" ref = "receiver_email" onChange = {this.onChange}></textarea>
             
            </div>
            <label> Subject </label>
              <textarea rows="2" name = "subject" ref = "subject" onChange = {this.onChange}></textarea>
             
            </div>
            <div className="field">
            <label>Message</label>
              <textarea name = "message" ref = "message" onChange = {this.onChange}></textarea>
            </div>
           
            <button className="ui primary button" >
                  Send
            </button>
            </form>
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


export default connect(mapStateToProps)(SendMessage)