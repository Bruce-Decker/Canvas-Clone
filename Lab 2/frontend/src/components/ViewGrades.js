import Sidebar_Custom from './Sidebar_Custom'
import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { retrieveGrade } from '../actions/gradeAction'

class ViewGrades extends Component {
    constructor() {
        super();
        this.state = {
            grades: [],
            isTableVisible: false
        }
    }

    componentWillMount() {
         this.props.retrieveGrade(this.props.match.params.CourseId, this.props.auth.user.email)
    }

    async componentDidMount() {
       
        const response = await axios.get('/grade/getGrades/' + this.props.match.params.CourseId + "/" + this.props.auth.user.email)
        this.setState({
            grades: response.data,
            isTableVisible: true
        })
        console.log(response.data)
      
       
    }

    render() {
        return (
            <div className = "pageDesign">
            <Banner />
           { this.props.auth.isFaculty ? <Sidebar_Faculty /> : <Sidebar_Custom /> }
           <div className = "tableContainer">
             <table className="ui celled table">
             <Table />
           {  this.state.grades.map(grade =>  
            //    <h1> {`${grade.item_name  }     ${grade.earned_points}`} </h1>
            <tr>
            <td key = {grade.item_name}>{grade.item_name}</td>
            <td key = {grade.item_name}>{grade.earned_points}</td>
            <td key = {grade.item_name}>{grade.full_points}</td>

         </tr>

              )}
            </table>
              </div>
            </div>
        )
    }

}

var Table = () => ({
    render: function() {
        return (
            <thead>
            <tr>
                <th> Assignment </th>
                <th> Earned Points</th>
                <th> Total Points</th>
            </tr>
            </thead>

        )
    }
})

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { retrieveGrade })(ViewGrades)