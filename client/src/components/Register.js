import React, { Component } from 'react'
import RegisterBanner from './RegisterBanner'
import { withRouter } from 'react-router-dom';
import classnames from 'classnames'
import axios from 'axios'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { registerUser } from '../actions/authActions'

import '../App.css';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        }
    }

 componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
         this.setState({errors: nextProps.errors})
     }
 }

  onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
     e.preventDefault()
     const newUser = {
         name: this.state.name, 
         email: this.state.email,
         password: this.state.password,
         password2: this.state.password2
     }
     console.log(newUser)

    this.props.registerUser(newUser, this.props.history)
    this.state.errors = null
    //  axios.post('/createBasicUser', newUser)
    //     .then(result => console.log(result.data))
    //     .catch(err => this.setState({errors: err.response.data}))
  }

  render() {
      const { errors } = this.state;

      const { user } = this.props.auth;
     
      return (
        <div>
            
         <div className = "bannerContainer">
       
          <RegisterBanner />
         
          </div>
        

          <div className = "registerContainer">
           
           

                                <form className="ui form" onSubmit = {this.onSubmit}>
                                    <div className="field">
                                    <label>Name</label>


                                    <input type="text" 
                                           placeholder="Name" 
                                           name="name" 
                                           id="okta-signin-username"  
                                           aria-label="Name" 
                                           autoComplete="off" 
                                           value = {this.state.name}
                                           onChange = {this.onChange}
                                                                 
                                    /> 
                                    <div className = "inputError">
                                            {errors.name }
                                    </div>



                                    </div>
                                    <div className="field">
                                    <label> Email </label>


                                    <input type="text" 
                                                                     placeholder="Email" 
                                                                     name="email" 
                                                                     id="okta-signin-email" 
                                                                     aria-label="Email" 
                                                                     autoComplete="off" 
                                                                     value = {this.state.email}
                                                                     onChange = {this.onChange}
                                                                     />      

                                                             <div className = "inputError">
                                                                {errors.email }
                                                             </div> 
                                    


                                    </div>
                                    <div className="field">
                                    <label> Password </label>
                                    <input type="password" 
                                                                     placeholder="Password" 
                                                                     name="password" 
                                                                     id="okta-signin-password" 
                                                                     aria-label="Password" 
                                                                     autoComplete="off" 
                                                                     value = {this.state.password}
                                                                     onChange = {this.onChange}
                                                                     />  
                                                             <div className = "inputError">
                                                                  {errors.password }
                                                             </div>      
                                          
                                    </div>

                                    <div className="field">
                                    <label> Type Password Again </label>
                                    <input type="password" 
                                                                     placeholder="Type Password Again" 
                                                                     name="password2" 
                                                                     id="okta-signin-password2" 
                                                                     aria-label="Password2" 
                                                                     autoComplete="off" 
                                                                     value = {this.state.password2}
                                                                     onChange = {this.onChange}
                                                                     />   

                                                             <div className = "inputError">
                                                                  {errors.password2 }
                                                             </div>      
                                                                  


                                    </div>
                                    <button className="ui button" type="submit">Submit</button>
                               </form>
             </div>

                                
          </div>
        
          )
      }
    
    }

Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})
    
export default connect(mapStateToProps, { registerUser })(withRouter(Register)); 