import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import faker from 'faker'
import { retrieveProfile } from '../actions/userProfileAction'
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import Board from 'react-trello'

import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable} from 'react-beautiful-dnd'

// var items = [200, 201, 202, 204, 206, 207, 211, 217, 227, 281, 290, 291, 292, 295, 301, 302, 304, 305]

var items = ["1.png", "2.png", 
            "3.jpeg", "4.jpeg", "5.jpeg", 
            "6.jpeg", "7.jpeg", "8.png", 
            "9.jpeg", "10.jpeg", "11.jpeg", 
            "12.jpeg", "13.jpeg", "14.jpeg", 
            "15.jpeg", "16.jpeg", "17.jpeg", 
            "18.jpeg", "19.jpeg", "20.jpeg", 
            "21.jpeg", "22.jpeg", "23.jpeg", "24.jpeg", "25.jpeg"]


const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Registered Courses',
       
        cards: [
        
        ]
      },
      {
        id: 'lane2',
        title: 'In Progress',
       
        cards: []
      },
      {
        id: 'lane3',
        title: 'Completed',
       
        cards: []
      }
    ]
  }
class showRegisteredCourse extends Component {

   
    constructor() {
        super();
        this.state = {
          
          
            courses: [],
            listVisibility: false,
            redirect: false
        }

       
    }

    onClick = (courseId) => {
        console.log(courseId)
      
        var data = {
            email: this.props.auth.user.email,
            CourseId: courseId
        }
     
       

        axios.post('/course/dropCourse', data)
        .then(res => window.location.reload())
        .catch(err => console.log(err))
    }

   
    componentWillMount() {
        this.props.retrieveProfile(this.props.auth.user.email);
    }


//     componentWillMount() {
     
       
//        const response =  axios.get('/course/registerCourse/' + this.props.auth.user.email)
//        console.log(response.data)
//        var new_data = [
//         {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'}
//       ]
//        data.lanes[0].cards = new_data

        
       
       
//     this.setState({
//         courses: response.data,
//     })
//      this.props.retrieveProfile(this.props.auth.user.email);
//    }

   async componentDidMount() {
       // this.props.retrieveProfile(this.props.auth.user.email);

       var onClick = (courseId) => {
        console.log(courseId)
      
        var data = {
            email: this.props.auth.user.email,
            CourseId: courseId
        }
     
       

        axios.post('/course/dropCourse', data)
        .then(res => window.location.reload())
        .catch(err => console.log(err))
    }
      
        const response = await axios.get('/course/registerCourse/' + this.props.auth.user.email)
        this.setState({
            courses: response.data,
        })
        if (this.state.courses[0].CourseId !== null) {
            console.log(data.lanes[0].cards)
        var test_array = []
        response.data.forEach(function(element) {
            
            var data = {
                id: element.CourseId,
                email: element.email,
                title: element.CourseName,
                description: element.CourseDescription,
                CourseTerm: element.CourseTerm,
                CourseDept: element.CourseDept,
                label: element.CourseTerm,
                cardColor: '#FFD700',
                cardStyle: {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15},
                onClick: onClick
                
            }
            test_array.push(data)
            
        })
       console.log(test_array)
       data.lanes[0].cards = test_array
           
         this.setState({
           
            listVisibility: true
           
        })
        } else {
            this.setState({
           
                listVisibility: false
               
            })

        }
        // var new_data = [
        //     {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'}
        //   ]
        // data.lanes[0].cards = new_data
    //     console.log(data.lanes[0].cards)
    //     var test_array = []
    //     response.data.forEach(function(element) {
            
    //         var data = {
    //             id: element.CourseId,
    //             email: element.email,
    //             title: element.CourseName,
    //             description: element.CourseDescription,
    //             CourseTerm: element.CourseTerm,
    //             label: element.CourseTerm,
    //             cardColor: '#FFD700',
    //             cardStyle: {borderRadius: 6, boxShadow: '0 0 6px 1px #BD3B36', marginBottom: 15},
    //             onClick: onClick
                
    //         }
    //         test_array.push(data)
            
    //     })
    //    console.log(test_array)
    //    data.lanes[0].cards = test_array
        
       
       
        

       
    }

  

    render() {
        

          
     
      
        return (
            <div>
              <Banner style = {{position: "fixed"}}/>
              { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
              <div className = "registerCourseContainer2">
              <h1 className = "Abril_Fatface"> Your registered courses </h1>
              <h1 className = "Abril_Fatface"> react-trello </h1>
             
     

              { this.state.listVisibility ?
               <div>
                    <Board data={data} draggable = {true}  customCardLayout = {true} style={{padding: '10px 30px',fontFamily: 'Helvetica', backgroundColor: '#6495ED'}} className="boardContainer">
                    <CustomCard data={data} onClick = {this.onClick}/>
                    </Board>
                   
               {  this.state.courses.map(course =>  

                
               
                    
                   
                    <div className="showRegisteredCourse">
                  
                        <div className="col s12 m7">
                        <div className="card" style = {{width: "380px"}}>
                            <div className="card-image">
                          
                            <Image  />
                            
                            </div>
                            <div className="card-content">
                            <h4 key = {course.CourseId}> <Link to = {`/CourseProfile/${course.CourseId}/${course.email}`} params = {course.CourseId}  >{course.CourseTerm}-{course.CourseId}-{course.CourseName}</Link>   </h4>
                            <h4 key = {course.CourseId}> Instructor Email:  {course.email} </h4>
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
                </div> : null } 

               
                </div>
          </div>
        )
    }

}

const CustomCard = (props) => {
   
    return (
      <div>
          <Image2 />
        <header
          style={{
            borderBottom: '1px solid #eee',
            paddingBottom: 10,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            color: props.cardColor
          }}>
         
          <div style={{fontSize: 16, fontWeight: 'bold'}}>{props.id} {props.title}</div>
         
         
        </header>
        <div style={{fontSize: 14, height: 120}}>
          <div style={{color: '#4C4C4C', fontWeight: 'bold'}}>Department: {props.CourseDept}</div>
         
          <div style={{padding: '5px 0px'}}>
          <div>
            <i>Instructor Email: {props.email}</i>
            </div>
            <div>
            <i>Term: {props.CourseTerm}</i>
            </div>
            <ListButton value = {props.id} onClick = {props.onClick}/>
          </div>
         
          <div style={{marginTop: 10, textAlign: 'center', color: props.cardColor, fontSize: 15, fontWeight: 'bold'}}>
            {props.escalationText}
          </div>
        </div>
      </div>
    )
  }

var Image = (props) => ({
    
    render: function() {
      console.log(items[Math.floor(Math.random()*items.length)])
        return (
            // <img src = {`http://lorempixel.com/400/200/nature?${Math.random()}}`} style = {{height: "150px"}}/>
            
            // <img src = {`https://picsum.photos/400/${items[Math.floor(Math.random()*items.length)]}`} style = {{height: "150px"}}/>
            <img src = {`./public_image/${items[Math.floor(Math.random()*items.length)]}`} style = {{height: "150px"}}/>
        )
    }
})

var Image2 = (props) => ({
    
    render: function() {
        return (
            // <img src = {`http://lorempixel.com/400/200/nature?${Math.random()}}`} style = {{height: "150px"}}/>
            
            // <img src = {`https://picsum.photos/400/${items[Math.floor(Math.random()*items.length)]}`} style = {{height: "125px", width: "100%"}}/>
            
            <img src = {`./public_image/${items[Math.floor(Math.random()*items.length)]}`} style = {{height: "125px", width: "100%"}}/>
        )
    }
})


var ListButton = (props) => ({
    
    render: function() {
        return (
            <button className="ui red button drop_button" onClick={() => this.props.onClick(this.props.value)}> Drop </button>

        )
    }
})


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, {retrieveProfile })(showRegisteredCourse)