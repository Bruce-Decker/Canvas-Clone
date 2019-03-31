import Sidebar_Custom from './Sidebar_Custom'

import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Sidebar_Faculty from './Sidebar_Faculty';


class SearchCourse extends Component {
    constructor() {
        super();
        this.state = {
        
          SearchByCourseId: '',
          SearchByCourseName: '',
          SearchByCourseValue: '',
          didSubmit: false,
          Courses: [],
          value_option: '',
          CourseTerm: '',
          toggle: false
   
        }
    }

    onChange = (e) => {
      
        this.setState({[e.target.name]: e.target.value})
    } 

    onClick = (courseId, status, faculty_email) => {
        var data = {
            email: this.props.auth.user.email,
            status: status,
            CourseId: courseId,
            faculty_email: faculty_email
          
        }
       
        console.log("onclick id " + courseId)
        console.log("status " + status)
        axios.post('/course/registerCourse', data)
        .then(res => this.componentDidMount())
        .catch(err => console.log(err))

        // axios.post('/registerCourse', data)
        // .then(res => this.componentDidMount())
        // .catch(err => console.log(err))

    }

    onSubmit = (e) => {
       e.preventDefault()
       this.setState({
         Courses: []
       })

       console.log("term " + this.state.CourseTerm)
       console.log("ID " + this.state.SearchByCourseId)
        if (this.state.SearchByCourseId !== '') {
          
            var data = {
                id: this.state.SearchByCourseId
            }
           
           axios.post('/course/searchCoursebyID', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  

        if (this.state.SearchByCourseName) {
          
            var data = {
                courseName: this.state.SearchByCourseName
            }
           axios.post('/course/searchCoursebyName', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  

        if (this.state.SearchByCourseValue && this.state.value_option == "greater_than") {
          
            var data = {
                CourseId: this.state.SearchByCourseValue
            }
           axios.post('/course/searchCoursebyValueGreaterThan', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  

        if (this.state.SearchByCourseValue && this.state.value_option == "less_than") {
          
            var data = {
                CourseId: this.state.SearchByCourseValue
            }
           axios.post('/course/searchCoursebyValueLessThan', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  
        if (this.state.CourseTerm) {
            var CourseTerm = this.state.CourseTerm
            //var CourseTerm = "\"" + CourseTerm + "\"";
            var data = {
                CourseTerm: CourseTerm
            }
           axios.post('/course/searchCoursebyTerm', data )
              .then(res => this.helper(res))
              .catch(err => console.log(err)) 
        }  
    
    }

    helper = (response) => {
        console.log("response " + JSON.stringify(response.data))
        this.setState({
            courses: response.data,
            didSubmit: true,
            toggle: true
        })

        if (response.data[0].CourseId == null) {
            this.setState({
                courses: response.data,
                didSubmit: true,
                toggle: false
            })
        }
       
      
      }

      ListButton = (ID, status, faculty_email) =>  {
        var found
       
        this.state.registeredCourses.forEach(function(element) {
             
             if (element.CourseId == ID) {
                 found = true
             }
         })
    
            if (!found && status == "open") {
                return (
                    <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status, faculty_email)}> Add </button>
    
                )
            } 
            if (!found && status == "waitlist") {
                return (
                    <button className="ui blue button drop_button" onClick={() => this.onClick(ID, status, faculty_email)}> Waitlist </button>
    
                )
            } 
        }

    async componentDidMount() {
        const response2 = await axios.get('/course/listRegisteredCourses/' + this.props.auth.user.email)
       // console.log(response2.data)
        this.setState({
          
            registeredCourses: response2.data
          
           
        })
      
    }

    render() {
     
        return (
           
            <div className = "pageDesign">
              <Banner />
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              
              <div className = "profileContainer">

              <form onSubmit = {this.onSubmit} className="ui form">
             
             
                <div className="field">
                <label> Search By CourseId</label>
                <input type="text" name="SearchByCourseId" placeholder="CourseId" value = {this.state.SearchByCourseId} onChange = {this.onChange}/>
                </div>

                <div className="field">
                <label> Search By Course Name</label>
                <input type="text" name="SearchByCourseName" placeholder="Course Name" value = {this.state.SearchByCourseName} onChange = {this.onChange}/>
                </div>

                <div className="field">
                <label> Search By Value</label>
                <div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="value_option" id = "greater_than" value = "greater_than"  onChange = {this.onChange}/>
            <label for = "greater_than">Greater than</label>
          </div>
        </div>
        <div className="field">
          <div className="ui radio checkbox">
            <input type="radio" name="value_option" id = "less_than" value = "less_than" onChange = {this.onChange}/>
            <label for = "less_than">Less than</label>
          </div>
        </div>
       
      </div>
              
                <input type="text" name="SearchByCourseValue" placeholder="Course Value" value = {this.state.SearchByCourseValue} onChange = {this.onChange}/>
                </div>
               
                <div className="field">
                
                </div>
                <div className="field">
                <select width = "50px" name="CourseTerm" onChange = {this.onChange}>
                   <option value="termSelect" id = "termSelect"  onChange = {this.onChange}>Please select a term</option>
                    <option value="Spring 2019" id = "Spring2019"  onChange = {this.onChange}>Spring 2019</option>
                    <option value="Fall 2018" id = "Fall2018"  onChange = {this.onChange}>Fall 2018</option>
                    <option value="Spring 2018" id = "Spring2018"  onChange = {this.onChange}>Spring 2018</option>
                    <option value="Fall 2017" id = "Fall2017" onChange = {this.onChange}>Fall 2017</option>
                </select>
                </div>
                <div className="field">
                
                </div>
                <button className="ui button" type="submit">Submit</button>
               
  
                <div className="space">
                
                </div>
            </form>
           

          {this.state.toggle ? <div>
             {this.state.didSubmit ?  
             <div>
                 {  this.state.courses.map(course =>  
              
                    <div class="card">
                    <div class="card-body">
                 
                        <h3 className = "BreeSerif"> {course.CourseId} {course.CourseName}</h3>
                        <h3 className = "BreeSerif"> Instructor email: {course.faculty_email} </h3>
                        <h3 className = "BreeSerif"> Course Description: {course.CourseDescription} </h3>
                        <h3 className = "BreeSerif"> Course Room: {course.CourseRoom} </h3>
                        <h3 className = "BreeSerif"> Course Capacity: {course.CourseCapacity} </h3>
                        <h3 className = "BreeSerif"> Course Waitlist Capacity: {course.WaitlistCapacity} </h3>
                        <h3 className = "BreeSerif"> Course Term: {course.CourseTerm} </h3>
                        <h3 className = "BreeSerif"> Status: {course.status} </h3>
                       

                        {/* <button className="ui button blue" type="submit" onClick = {() => this.onClick(course.CourseId)}> Register </button> */}
                        {this.ListButton(course.CourseId, course.status, course.faculty_email)}
                    </div>
                    </div>
                  
                

                )}  </div>: null}
               </div>
                : null}

                
        
            </div>
            </div>
        )


   }
}





const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(SearchCourse)