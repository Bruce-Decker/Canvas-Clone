import React, { Component } from 'react'
import LoginBanner from './LoginBanner'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Query, Mutation } from 'react-apollo'
import { LOGIN } from '../mutations/index'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }



    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e, login) => {
        e.preventDefault()
        const user = {
           
            email: this.state.email,
            password: this.state.password,
           
        }
       
        login().then(({data}) => {
            console.log("sdfsdfsdf")
            console.log(data)
            console.log(data.login)
            localStorage.setItem('jwtToken', data.login.jwtToken)
            this.setState({
                email: "",
                password: ""
            })
        })
   
   
     }

  render() {
     const { errors } = this.state
     const {email, password } = this.state

      return (
          <div className = "Login">
           <div className = "bannerContainer">
               <LoginBanner />
           </div>
             

        <div className = "loginContainer">
        <Mutation mutation = {LOGIN} variables = {{ email, password  }}>
                  {(login, { data, loading, error}) => {
                      return (
                <form onSubmit = { e => this.onSubmit(e, login)} className="ui large form">
                                    <div className="field">
                                    <label> Email </label>
                                    <input  type="text" 
                                            placeholder="SJSU Email" 
                                            name="email" 
                                            id="okta-signin-username"  
                                            aria-label="SJSU Email" 
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
                                    
                                    </div>
                                    <button className="ui button" type="submit">Submit</button>
                                    { error ? <p>{error.message}</p> : null}
                                    <div className="space">
                                    
                                    </div>
                  </form>
                   )}}
                    </Mutation>
              </div>
              </div>
         
      )
  }

}


export default withRouter(Login)
