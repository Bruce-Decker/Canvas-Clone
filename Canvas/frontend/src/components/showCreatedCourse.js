import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


var items = [200, 201, 202, 204, 206, 207, 211, 217, 227, 281, 290, 291, 292, 295, 301, 302, 304, 305]
class showCreatedCourse extends Component {
    constructor() {
        super();
        this.state = {
          
          
            courses: [],
            listVisibility: false
        }

      

      

       
    }

    onClick = (courseId) => {
        // console.log(courseId)
        // console.log(this.props.auth.user.email)
        var data = {
            email: this.props.auth.user.email,
            CourseId: courseId
        }
     

        axios.post('/deleteCourse', data)
        .then(res => window.location.reload())
        .catch(err => console.log(err))

        

    }





    async componentDidMount() {
       
        const response = await axios.get('/createCourse/' + this.props.auth.user.email)
        this.setState({
            courses: response.data,
          
           
        })
        if (this.state.courses[0].CourseId !== null) {
           
            this.setState({
              
               listVisibility: true
              
           })
           } else {
               this.setState({
              
                   listVisibility: false
                  
               })
   
           }
       
    }

    render() {
      
        return (
            <div>
              <Banner />
              <Sidebar_Faculty />
            
              <div className = "registerCourseContainer2">
              <h1> Instructor's Courses </h1>
                 {  this.state.courses.map(course =>  

                    //  <h1 key = {course.CourseId}> <Link to = {`/CourseProfile/${course.CourseId}`} params = {course.CourseId}> {course.CourseId}   {course.CourseName}</Link>  </h1>
                    <div className="showRegisteredCourse">
                    <div className="col s12 m7">
                      <div className="card" style = {{width: "380px"}}>
                        <div className="card-image">
                          {/* <img src= {image_store[course.CourseId]} style = {{height: "150px"}} /> */}
                          <Image  />
                        
                        </div>
                        <div className="card-content">
                        <h4 key = {course.CourseId}> <Link to = {`/CourseProfile/${course.CourseId}`} params = {course.CourseId}>{course.CourseTerm}-{course.CourseId}-{course.CourseName}</Link>   </h4>
                        </div>
                        <div className="card-action">
                       <Link to ={`/ViewAnnouncements/${course.CourseId}`}> <i className="fas fa-bullhorn fa-lg"> </i> </Link>
                       <Link to ={`/viewQuizzes/${course.CourseId}`}> <i className="fas fa-pen-square fa-lg"></i> </Link>
                       <Link to ={`/ViewAssignments/${course.CourseId}/${this.props.auth.user.email}`}>  <i className="far fa-file-alt fa-lg"></i> </Link>
                       <Link to ={`/ListCourseFile/${course.CourseId}`}> <i className="fas fa-sticky-note fa-lg"></i> </Link>
                        
                       { this.state.listVisibility ? <ListButton value = {course.CourseId} onClick = {this.onClick}/> : null }
                        </div>
                      </div>
                    </div>
                  </div>
                 )}
                  
              
                </div>
          </div>
        )
    }

}


var Image = (props) => ({
    
    render: function() {
        return (
            // <img src = {`http://lorempixel.com/400/200/nature?${Math.random()}}`} style = {{height: "150px"}}/>
            
            <img src = {`https://picsum.photos/400/${items[Math.floor(Math.random()*items.length)]}`} style = {{height: "150px"}}/>
        )
    }
})

var ListButton = (props) => ({
    
    render: function() {
        return (
            <button className="ui red button drop_button" onClick={() => this.props.onClick(this.props.value)}> Delete Course </button>

        )
    }
})






const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(showCreatedCourse)