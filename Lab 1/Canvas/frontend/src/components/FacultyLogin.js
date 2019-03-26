import React, { Component } from 'react'
import LoginBanner from './LoginBanner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginFaculty } from '../actions/authActions'


class FacultyLogin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
           
             this.props.history.push('/showCreatedCourse')
        }
        if (nextProps.errors) {
          
            this.setState({errors: nextProps.errors})
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const user = {
           
            email: this.state.email,
            password: this.state.password,
           
        }
        console.log(user)
        localStorage.setItem('isFaculty', 'yes')
   
       this.props.loginFaculty(user)
       //this.state.errors = null
       //  axios.post('/createBasicUser', newUser)
       //     .then(result => console.log(result.data))
       //     .catch(err => this.setState({errors: err.response.data}))
     }

  render() {
     const { errors } = this.state

      return (
          <div className = "Login">
           <div className = "bannerContainer">
               <LoginBanner />
           </div>
             

        <div className = "loginContainer">
           <div className = "well">
                <form onSubmit = {this.onSubmit} className="ui large form">
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
                                    <div className="space">
                                    
                                    </div>
                  </form>
                  </div>
              </div>
              </div>
         
      )
  }

}

FacultyLogin.propTypes = {
    loginFaculty: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginFaculty })(FacultyLogin);
