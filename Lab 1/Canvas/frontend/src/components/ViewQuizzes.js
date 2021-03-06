import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ViewQuizzes extends Component {
    constructor() {
        super();
        this.state = {
            quizzes: []

         
        }

       
    }

    async componentDidMount() {
       
        const response = await axios.get('/quizzes/' + this.props.match.params.CourseId)
        this.setState({
            quizzes: response.data,
        })

        console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
            <Banner />
           { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
           <div className = "registerCourseContainer">
              {  this.state.quizzes.map(quiz =>  
              <div class="card">
              <div class="card-body">
                   <Link to = {`/takeQuiz/${this.props.match.params.CourseId}/${quiz.quiz_name}`}> <h1> {quiz.quiz_name}</h1></Link>
                 <h1> {quiz['SUM(points)']} points </h1>
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


export default connect(mapStateToProps)(ViewQuizzes)


