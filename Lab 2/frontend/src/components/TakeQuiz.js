import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class TakeQuiz extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
           // email: this.props.auth.user.email
           

         
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})

    }

    onClick = (e) => {
        console.log(this.state)
        //window.location.reload();
        var data = this.state
        data['email'] = this.props.auth.user.email
        delete data['questions']
        axios.post('/quiz/submitQuiz/' + this.props.match.params.CourseId + '/' + this.props.match.params.quizName, data)
           .then(res => window.location.reload())
           .catch(err => console.log(err))
    }

    

    async componentDidMount() {
       
        const response = await axios.get('/quiz/takeQuiz/' + this.props.match.params.CourseId + '/' + this.props.match.params.quizName + '/' + this.props.match.params.faculty_email)
        this.setState({
            questions: response.data,
        })

        console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
            <Banner />
           { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
           <div className = "registerCourseContainer">
        
           {  this.state.questions.map(question =>  
             
              <div className="ui form">
        <div className="grouped fields">
          <label>{question.question}</label>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name={`${question.question_id}`} id= {`A${question.uuid}`} onChange = {this.onChange} value = "A"/>
              <label for = {`A${question.uuid}`}>{question.option_one_question}</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name={`${question.question_id}`} id = {`B${question.uuid}`} onChange = {this.onChange} value = "B"/>
              <label for = {`B${question.uuid}`}>{question.option_two_question}</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name={`${question.question_id}`} id = {`C${question.uuid}`} onChange = {this.onChange} value = "C"/>
              <label for = {`C${question.uuid}`}>{question.option_three_question}</label>
            </div>
          </div>
          <div className="field">
            <div className="ui radio checkbox">
              <input type="radio" name={`${question.question_id}`} id = {`D${question.uuid}`} onChange = {this.onChange} value = "D"/>
              <label for = {`D${question.uuid}`}>{question.option_four_question}</label>
            </div>
          </div>
        </div>
      
      </div>
    
              
              )}
                <button className="ui button" type="submit" onClick = {this.onClick}>Submit</button>
              </div>
            </div>
        )
    }
 
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(TakeQuiz)

