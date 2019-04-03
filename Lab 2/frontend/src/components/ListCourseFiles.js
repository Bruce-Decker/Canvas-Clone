import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';

class ListCourseFile extends Component {
    constructor() {
        super();
        this.state = {
           items: []
         
        }

       
    }

    async componentDidMount() {
       
        const response = await axios.get('/file/listFiles/' + this.props.match.params.CourseId + '/' + this.props.auth.user.email)
        this.setState({
            items: response.data,
           
        })
        console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer">
              {  this.state.items.map(item =>  
               <div class="card">
               <div class="card-body">
                <Link to = {`/viewEachCourseFile/${this.props.match.params.CourseId}/${this.props.match.params.faculty_email}/${item.item_name}`}> <h3> {item.item_name}</h3></Link> 
                  
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


export default connect(mapStateToProps)(ListCourseFile) 