import Sidebar_Faculty from './Sidebar_Faculty'
import Banner from './Banner'
import '../App.css';
import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { createToken } from '../actions/tokenAction'

class FacultyGenerateToken extends Component {
    constructor() {
        super();
        this.state = {
          generated_token: '',
          generated_status: false,
          copied: false
        }

    }

    onClick = () => {
        var email = this.props.auth.user.email;
        var data = {
            email
        }
        axios.post('/token/generateCourseToken/' + this.props.match.params.CourseId, data)
            .then(res => {
                this.setState({generated_token: res.data.token, generated_status: true})
                this.props.createToken(res.data)
            }
                 
            )
            .catch(err =>  console.log(err))
    }

    render() {
      
        return (
            <div> 
                <Banner />
                <Sidebar_Faculty /> 
                <div className = "showCourseContainer">
                    <h1> Generate Token </h1>
                    <button className="ui primary button" onClick = {this.onClick}>
                       <i className="fas fa-key"></i>
                   </button>
                   <h1 className = "Cinzel"> {this.state.generated_token}</h1>
                 
                {this.state.generated_status ?
                  <div>
                        <CopyToClipboard text={this.state.generated_token}
                        onCopy={() => this.setState({copied: true})}>
                        <button><i className="fas fa-pen-alt"></i></button>
                        </CopyToClipboard>
                
                        {this.state.copied ? <span style={{color: 'red'}}> Copied! </span> : null}
                    </div>
                   : null }
 
                </div>

            </div>
        )

   

    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps, { createToken })(FacultyGenerateToken)