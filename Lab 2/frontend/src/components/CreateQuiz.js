import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'


class CreateQuiz extends Component {
    constructor() {
        super();
        this.state = {
            quiz_name: '',
            question_id: '',
            question: '',
            option_one_question: '',
            option_two_question: '',
            option_three_question: '',
            option_four_question: '',
            right_answer: '',
            points: ''
        }

    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        var quiz_name = this.state.quiz_name
        var email = this.props.auth.user.email
        var question_id = this.state.question_id
        var question = this.state.question
        var option_one_question = this.state.option_one_question
        var option_two_question = this.state.option_two_question
        var option_three_question = this.state.option_three_question
        var option_four_question = this.state.option_four_question
        var right_answer = this.state.right_answer
        var points = this.state.points
        var data = {
            quiz_name,
            email,
            question_id,
            question,
            option_one_question,
            option_two_question,
            option_three_question,
            option_four_question,
            right_answer,
            points
        }
        axios.post('/quiz/createQuiz/' + this.props.match.params.CourseId, data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

    }


    render() {
      
        return (
            <div>
                 <Banner />
                 <Sidebar_Faculty /> 
                 <div className = "profileContainer">
                        
               
                        <h1> Create Quiz </h1>
                        <form onSubmit= {this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Quiz Name</label>
                            <input type="assignment_name" className="form-control" name="quiz_name"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Quiz ID</label>
                            <input type="assignment_name" className="form-control" name="question_id"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Question </label>
                            <input type="assignment_name" className="form-control" name="question"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">First Option </label>
                            <input type="assignment_name" className="form-control" name="option_one_question"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1"> Second Option </label>
                            <input type="assignment_name" className="form-control" name="option_two_question"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Third Option </label>
                            <input type="assignment_name" className="form-control" name="option_three_question"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Fourth Option</label>
                            <input type="assignment_name" className="form-control" name="option_four_question"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Right Answer (Select A, B, C, or D)</label>
                            <input style={{width:"100px"}} type="assignment_name" className="form-control" name="right_answer"  onChange = {this.onChange}/>
                            </div>
                            <div className="form-group">
                            <label htmlFor="exampleFormControlInput1">Points</label>
                            <input style={{width:"100px"}} type="assignment_name" className="form-control" name="points"  onChange = {this.onChange}/>
                            </div>
                        
                        
                        
                            
                            <button className="ui button" type="submit">Submit</button>
                   </form>
                         
                   </div>

            </div>
        )

    }
}



const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CreateQuiz)