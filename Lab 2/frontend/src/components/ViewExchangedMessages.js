import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';

class ViewExchangedMessages extends Component {
    constructor() {
        super();
        this.state = {
           messages: []
         
        }

       
    }

    async componentDidMount() {
       
        const response = await axios.get('/message/getExchangedMessages/' + this.props.match.params.receiver_email + '/' + this.props.match.params.sender_email + '/' + this.props.match.params.subject.replace(/%20/g, " "))
        this.setState({
            messages: response.data,
           
        })
        console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
              <h1><i className="fas fa-envelope"></i> Conversation with {this.props.match.params.sender_email} </h1>
              {  this.state.messages.map(message =>  
               
              
                  <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title"> <Link to = {`/ViewExchangedMessages/${message.receiver_email}/${message.sender_email}/${message.subject}`}> <b>{message.subject} </b> </Link></span>
                     <p>{message.message} </p>
                    </div>
                    <div class="card-action">
                     
                      <a href="#">{message.sender_email}</a>
                      <a href="#">{message.time}</a>
                    </div>
                  </div>
               
             
                           

              )}
              </div>
            </div>
           

        )
    }

}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps)(ViewExchangedMessages)