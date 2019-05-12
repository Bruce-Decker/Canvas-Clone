import React, { Component } from 'react'
import RegisterBanner from './RegisterBanner'
import { withRouter } from 'react-router-dom';
import classnames from 'classnames'
import axios from 'axios'
import propTypes from 'prop-types'
import Validator from 'validator'
import { registerUser } from '../actions/authActions'
import { connect } from 'react-redux'
import { Query, Mutation } from 'react-apollo'
import { REGISTER } from '../mutations/index'
import isEmpty from '../validation/isEmpty'


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


  onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e, register) => {
     e.preventDefault()
     const newUser = {
         name: this.state.name, 
         email: this.state.email,
         password: this.state.password,
         password2: this.state.password2
     }
     console.log(newUser)

     if (!Validator.isEmail(this.state.email)) {

        this.state.errors.email = 'Email is invalid';
        this.setState({
            errors: this.state.errors,
            email: "",
            name: "",
            password: "",
            password2: ""
        })
      }
     if (isEmpty(this.state.name)) {
         console.log("empty")
        this.state.errors.name = 'Name is empty';
        this.setState({
            errors: this.state.errors,
            email: "",
            name: "",
            password: "",
            password2: ""
        })
      } 

      if (isEmpty(this.state.email)) {
        console.log("empty")
       this.state.errors.email = 'Email is empty';
       this.setState({
           errors: this.state.errors,
           email: "",
           name: "",
           password: "",
           password2: ""
       })
     }

     if (isEmpty(this.state.password)) {
        console.log("empty")
       this.state.errors.password = 'Password is empty';
       this.setState({
           errors: this.state.errors,
           email: "",
           name: "",
           password: "",
           password2: ""
       })
     }

     if (isEmpty(this.state.password2)) {
       console.log("empty")
       this.state.errors.password2 = 'Password confirmation is empty';
       this.setState({
           errors: this.state.errors,
           email: "",
           name: "",
           password: "",
           password2: ""
       })
     }

     if (this.state.password !== this.state.password2) {
        console.log("empty")
        this.state.errors.password = 'Passwords must match';
        this.setState({
            errors: this.state.errors,
            email: "",
            name: "",
            password: "",
            password2: ""
        })
      }
     if (Object.entries(this.state.errors).length === 0)
     
        register().then(data => {
            console.log(data)
            this.props.registerUser()
        })
  }

  render() {
      const { errors } = this.state;
      var name = this.state.name
      var email = this.state.email
      var password = this.state.password
     
      return (
        
          
        <div>
             
         <div className = "bannerContainer">
       
          <RegisterBanner />
         
          </div>
        

          <div className = "registerContainer">
          <h1>Home</h1>
          {/* <Query query = {GET_ALl_USERS}>
          {({ data, loading, error }) => {
              if (loading) return <div> Loading </div>
              if (error) return <div> error </div>
             console.log(data)
             return (
                 <h1>sdfsdf</h1>
             )
          }}
          </Query> */}
           
           
              <Mutation mutation = {REGISTER} variables = {{ name, email, password  }}>
                  {(register, { data, loading, error}) => {
                      return (
                                <form className="ui form" onSubmit = {e => this.onSubmit(e, register)}>
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
                                    { error ? <p>{error.message}</p> : null}
                               </form>
                      )}}

                </Mutation>
             </div>

                                
          </div>
        
          )
      }
    
    }


    
    const mapStateToProps = (state) => ({
        auth: state.auth,
        errors: state.errors
    })
        
    export default connect(mapStateToProps, { registerUser })(withRouter(Register)); 