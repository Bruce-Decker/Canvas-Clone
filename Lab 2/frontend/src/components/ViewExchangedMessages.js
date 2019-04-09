import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';
import Pagination from './Pagination'

class ViewExchangedMessages extends Component {
    constructor() {
        super();
        this.state = {
           messages: [],
           currentMessages: [],
           currentPage: null, 
           totalPages: null ,
           isVisible: false
         
        }

       
    }

    onPageChanged = data => {
       
        console.log(data)
        const { messages }  = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentMessages = messages.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentMessages, totalPages });
      }

    async componentDidMount() {
       
        const response = await axios.get('/message/getExchangedMessages/' + this.props.match.params.receiver_email + '/' + this.props.match.params.sender_email + '/' + this.props.match.params.subject.replace(/%20/g, " "))
        this.setState({
            messages: response.data,
            isVisible: true
           
        })
        console.log(response.data)
      
       
    }

    render() {

        const { messages, currentMessages, currentPage, totalPages } = this.state;
        const totalMessages = messages.length;
        console.log("totalMessages " + totalMessages)
        console.log(currentMessages)
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
              <h1><i className="fas fa-envelope"></i> Conversation with {this.props.match.params.sender_email} </h1>

              {this.state.isVisible ? <div>

             
           <div className="d-flex flex-row py-4 align-items-center">

                <Pagination totalRecords={ totalMessages } pageLimit={2} pageNeighbours={1} onPageChanged={this.onPageChanged} />
            </div>
                    {  this.state.currentMessages.map(message =>  
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
                     </div> : null}
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