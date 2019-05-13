import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { GET_CREATED_COURSES} from '../queries/index'
import { DELETE_CREATED_COURSE } from '../mutations/index'

import { Query, Mutation } from 'react-apollo'


var items = ["1.png", "2.png", 
            "3.jpeg", "4.jpeg", "5.jpeg", 
            "6.jpeg", "7.jpeg", "8.png", 
            "9.jpeg", "10.jpeg", "11.jpeg", 
            "12.jpeg", "13.jpeg", "14.jpeg", 
            "15.jpeg", "16.jpeg", "17.jpeg", 
            "18.jpeg", "19.jpeg", "20.jpeg", 
            "21.jpeg", "22.jpeg", "23.jpeg", "24.jpeg", "25.jpeg"]

class showCreatedCourse extends Component {
    constructor() {
        super();
        this.state = {
          

        }

      

      

       
    }

    onClick = (deleteCreatedCourse) => {
        // console.log(courseId)
        // console.log(this.props.auth.user.email)
       

        deleteCreatedCourse().then(({ data }) => {
            window.location.reload()
        })
     

        // axios.post('/course/deleteCourse', data)
        // .then(res => window.location.reload())
        // .catch(err => console.log(err))

        

    }

    componentWillMount() {
       
      }





    async componentDidMount() {
     
    }

    render() {
       var email = this.props.auth.user.email
        return (
            <div>
              <Banner />
              <Sidebar_Faculty />
            

              <div className = "registerCourseContainer2">
             
              <h1> Instructor's Courses </h1>

           
               <div>


                 <Query query = {GET_CREATED_COURSES} variables = {{email}}>
                    {({ data, loading, error }) => {
                        if (loading) return <div> Loading </div>
                        if (error) return <div> error </div>
                        if (error) {
                            console.log(error)
                        }
                        console.log(data)
                         
                        return (
                            <div>
                            {data.showCreatedCourses.map(course => 
                            <div className="showRegisteredCourse">
                           {/* <h1>{data.showCreatedCourses.map(course => <li>{course._id}</li>)}</h1> */}
                           <div className="col s12 m7">
                            <div className="card" style = {{width: "380px"}}>
                                <div className="card-image">
                                <Image  />
                                </div>
                                <div className="card-content">
                                     <h4>{course.CourseTerm}-{course.CourseId}-{course.CourseName}</h4>
                                </div>
                                <div className="card-action">
                                <Mutation mutation={DELETE_CREATED_COURSE} variables = {{email: email, CourseId: course.CourseId }}>
                                {(deleteCreatedCourse, { data, loading, error}) => {
                                    return (
                                       <ListButton value = {course._id} onClick = {() => this.onClick(deleteCreatedCourse)}/>
                                    )
                                }}
                                   </Mutation>
                                </div>

                           </div>
                           </div>
                           </div>
                            )}
                            </div>
                        )
                    }}
          </Query>
                   
                
                   </div> 
                  
              
                </div>
         
          </div>
        )
    }

}



var Image = (props) => ({
    
    render: function() {
        return (
            // <img src = {`http://lorempixel.com/400/200/nature?${Math.random()}}`} style = {{height: "150px"}}/>
            
            <img src = {`./public_image/${items[Math.floor(Math.random()*items.length)]}`} style = {{height: "150px"}}/>
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