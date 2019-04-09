import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'
import AnnouncementInput from './AnnouncementInput'
import Sidebar_Faculty from './Sidebar_Faculty';
import Pagination from './Pagination'

class ViewAnnouncements extends Component {
    constructor() {
        super();
        this.state = {
            announcements: [],
            currentAnnouncements: [],
            title: "",
            comment: "",
            currentPage: null, 
            totalPages: null ,
            isVisible: false
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    onClick = (e) => {
      
        var data = {
            email: this.props.auth.user.email,
            CourseId: this.props.match.params.CourseId,
            title: this.state.title,
            comment: this.state.comment,
          

        }
        console.log(data)
     
      

        axios.post('/course/announcement', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        

    }

    onPageChanged = data => {
       
        console.log("Data " + JSON.stringify(data))
        const { announcements } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentAnnouncements = announcements.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentAnnouncements, totalPages });
      }

  
    async componentDidMount() {
       
        const response = await axios.get('/course/announcement/' + this.props.match.params.CourseId)
            .then(response => {
                this.setState({
                    announcements: response.data,
                    isVisible: true
                })
            })
    }


    render() {
        const { announcements, currentAnnouncements, currentPage, totalPages } = this.state;
        const totalAnnouncements = announcements.length;
        console.log("totalAnnouncements " + totalAnnouncements)
        console.log(currentAnnouncements)
       
      
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
            
              <div className = "announcementContainer">
              { this.props.auth.isFaculty ? <AnnouncementInput onClick = {this.onClick} onChange = {this.onChange}/> : null }


              {this.state.isVisible ? <div>

             
                        <div className="d-flex flex-row py-4 align-items-center">
                        
                        <Pagination totalRecords={ totalAnnouncements } pageLimit={2} pageNeighbours={1} onPageChanged={this.onPageChanged} />
                        </div>
                        
                        {  currentAnnouncements.map(announcement =>  

                                        <div className="row">
                                        <div className="col s12 m6">
                                            <div className="card blue-grey darken-1">
                                            <div className="card-content white-text">
                                                <span className="card-title">{announcement.title}</span>
                                                <p>{announcement.comment}</p>
                                            </div>
                                            <div class="card-action">
                                            
                                                <a href="#">{announcement.email}</a>
                                                <a href="#">{announcement.time}</a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                            )}

                            </div> : null}
                </div>
            </div>
        )
    }
}


// var TextInput = (props) => ({
    
//     render: function() {
     
//         return (
//             <div className="ui form">
//             <div className="field">
//             <label> Title </label>
//               <textarea rows="2" name = "title" ref = "title" onChange = {this.props.onChange}></textarea>
             
//             </div>
//             <div className="field">
//             <label>Message</label>
//               <textarea name = "comment" ref = "comment" onChange = {this.props.onChange}></textarea>
//             </div>
           
//             <button className="ui primary button" onClick = {this.props.onClick}>
//                   Send
//             </button>
//           </div>
//         )
//     }
// })



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(ViewAnnouncements)