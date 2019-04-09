import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { retrieveQuiz } from '../actions/quizAction'

class ViewQuizzes extends Component {
    constructor() {
        super();
        this.state = {
            //quizzes: [],
            show: false

        }

       
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }

        this.setState({
            show: true
        })
    
    }

    async componentDidMount() {
        console.log(this.props.match.params.CourseId)
        console.log(this.props.match.params.email)


        this.props.retrieveQuiz(this.props.match.params.CourseId, this.props.match.params.faculty_email)
       
        // const response = await axios.get('/quiz/quizzes/' + this.props.match.params.CourseId + "/" + this.props.match.params.faculty_email)
        // this.setState({
        //     quizzes: response.data,
        // })
       
        // console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
            <Banner />
           { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
           <div className = "registerCourseContainer">

        {this.state.show ?
        <div>
              {  this.props.quizzes.quizzes.map(quiz =>  
              <div class="card">
              <div class="card-body">
                   <Link to = {`/takeQuiz/${this.props.match.params.CourseId}/${quiz._id}/${this.props.match.params.faculty_email}`}> <h1> {quiz._id}</h1></Link>
                 <h1> {quiz['points']} points </h1>
                </div>
                </div>
              )}
              </div> : null }
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    quizzes: state.quiz,
    errors: state.errors
})


export default connect(mapStateToProps , { retrieveQuiz })(ViewQuizzes)


