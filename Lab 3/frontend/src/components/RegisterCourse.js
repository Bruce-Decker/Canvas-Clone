import Sidebar_Custom from './Sidebar_Custom'
import Banner from './Banner'
import '../App.css';
import { connect } from 'react-redux'
import React, { Component } from 'react'

import { Query, Mutation } from 'react-apollo'
import { GET_UNREGISTERED_COURSES } from '../queries/index'
import { REGISTER_COURSE } from '../mutations/index'
class RegisterCourse extends Component {
    constructor() {
        super();
        this.state = {

           
        }
    }

    async componentDidMount() {
 
       
    }

    

    onClick = (registerCourse) => {
        
        registerCourse().then(({ data }) => {
            window.location.reload()
        })
      
    }

   


    render() {
        const email = this.props.auth.user.email
        return (
            <div className = "pageDesign">
            <Banner/>
      
             
             
                <Sidebar_Custom/>
          
                <div className = "selectCourseContainer">
                
                   

                <Query query = { GET_UNREGISTERED_COURSES } variables = {{email}}>
                {({ data, loading, error }) => {
                        if (loading) return <div> Loading </div>
                        if (error) return <div> error </div>
                        if (error) {
                            console.log(error)
                        }
                        console.log(data)
                         
                        return (
                            <div>
                            {data.showUnregisteredCourses.map(course => 
                     <div class="card">
                     <div class="card-body">
                          <h1>{course.CourseId} {course.CourseName}  </h1>
                        
                               {/* <ListButton value = {course.CourseId} onClick = {this.onClick}/> */}

                               {this.props.auth.isFaculty ? null :
                               <Mutation mutation={REGISTER_COURSE} variables = {{email: email, CourseId: course.CourseId, faculty_email: course.email }}>
                                {(registerCourse, { data, loading, error}) => {
                                    return (
                                       
                                        <ListButton value = {course._id} onClick = {() => this.onClick(registerCourse)}/>
                                           
                                    )
                                }}
                                   </Mutation>
                                    }
                        
                          
                           
                          <div>
                            
                             Faculty Email: {course.email}
                             {course.status === "closed" ? <h1> Closed </h1> : null }
                         
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
       
             
          
        )

    }


    



}

var ListButton = (props) => ({
    
    render: function() {
        return (
           
                 <button className="ui blue button drop_button" onClick={() => this.props.onClick(this.props.value)}> Add </button>
                

        )
    }
})

// var ListButton = (ID, status, faculty_email) =>  {
                
//     return (
//         <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status, faculty_email)}> Add </button>

//         )
    
      
//     }



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(RegisterCourse)