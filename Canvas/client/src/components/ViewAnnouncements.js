import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import faker from 'faker'
import { Link } from 'react-router-dom'
import AnnouncementInput from './AnnouncementInput'

class ViewAnnouncements extends Component {
    constructor() {
        super();
        this.state = {
            announcements: [],
            title: "",
            comment: ""

         
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
            comment: this.state.comment

        }
        console.log(data)
     
      

        axios.post('/announcement', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        

    }

  
    async componentDidMount() {
       
        const response = await axios.get('/announcement/' + this.props.match.params.CourseId)
        this.setState({
            announcements: response.data,
          
           
        })
      
       
    }


    render() {
      
        return (
            <div className = "pageDesign">
              <Banner />
              <Sidebar_Custom />
            
              <div className = "announcementContainer">
              { this.props.auth.isFaculty ? <AnnouncementInput onClick = {this.onClick} onChange = {this.onChange}/> : null }
             
               {  this.state.announcements.map(announcement =>  

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
                    
                   
                //     <div className="row">
                //     <div className="col s12 m7">
                //       <div className="card">
                //       <div class="card-image">
                //           <span class="card-title">{announcement.title}</span>
                //           </div>
                //         <div className="card-content">
                //         <p className="flow-text"> {announcement.comment}</p>
                //         <span className="card-title"> {announcement.time}</span>
                //         </div>
                //         <div className="card-action">
                         
                //           <Link to="/" target="/" onClick={(event) => {event.preventDefault(); window.open(this.makeHref("route"));}} > {announcement.email} </Link>
                //         </div>
                //       </div>
                //     </div>
                    
                //   </div>
                  
               
                )}
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