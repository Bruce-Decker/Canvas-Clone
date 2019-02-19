import React, { Component } from 'react'
import LoginBanner from './LoginBanner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions/authActions'


class Login extends Component {
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
           
             this.props.history.push('/profile')
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
   
       this.props.loginUser(user)
       //this.state.errors = null
       //  axios.post('/createBasicUser', newUser)
       //     .then(result => console.log(result.data))
       //     .catch(err => this.setState({errors: err.response.data}))
     }

  render() {
     const { errors } = this.state

      return (
          <div className = "Login">
               <LoginBanner />
              <div id="signin-container">
                  <div data-se="auth-container" id="okta-sign-in" className="auth-container main-container no-beacon">      
                      <div className="okta-sign-in-header auth-header">                
                          <img src="https://ok2static.oktacdn.com/bc/image/fileStoreRecord?id=fs01heub3azJBMXWF0x7" className="auth-org-logo" alt="San Jose State University" />                
                              <div data-type="beacon-container" className="beacon-container" />    
                              </div>      
                              <div className="auth-content">
                                  <div className="auth-content-inner">


                                     <div className="primary-auth">
                                       <form onSubmit = {this.onSubmit} data-se="o-form" id="form18" className="primary-auth-form o-form o-form-edit-mode">        
                                         <div data-se="o-form-content" className="o-form-content o-form-theme clearfix">                        
                                            <h2 data-se="o-form-head" className="okta-form-title o-form-head">Sign In</h2>                          
                                               <div className="o-form-error-container" data-se="o-form-error-container" />      
                                                  <div className="o-form-fieldset-container" data-se="o-form-fieldset-container">
                                                      <div data-se="o-form-fieldset" className="o-form-fieldset o-form-label-top">
                                                          <div data-se="o-form-input-container" className="o-form-input">
                                                              <span data-se="o-form-input-username" className="o-form-input-name-username o-form-control okta-form-input-field input-fix">              
                                                              <span className="input-tooltip icon form-help-16" data-hasqtip={0} />                    
                                                              <span className="icon input-icon person-16-gray" />  

                                                              <input type="text" 
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



                                                              </span></div></div><div data-se="o-form-fieldset" className="o-form-fieldset o-form-label-top">
                                                              <div data-se="o-form-input-container" className="o-form-input"><span data-se="o-form-input-password" className="o-form-input-name-password o-form-control okta-form-input-field input-fix">              
                                                              <span className="input-tooltip icon form-help-16" data-hasqtip={1} />                    
                                                              <span className="icon input-icon remote-lock-16" />            


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



                                                              </span></div></div><div data-se="o-form-fieldset" className="o-form-fieldset o-form-label-top margin-btm-0"><div data-se="o-form-input-container" className="o-form-input"><span data-se="o-form-input-remember" className="o-form-input-name-remember">    
                                                              <div className="custom-checkbox"><input type="checkbox" name="remember" id="input41" /><label htmlFor="input41" data-se-for-name="remember">Remember me</label></div>    </span></div></div></div>  </div>  <div className="o-form-button-bar"><input className="button button-primary" type="submit" defaultValue="Sign In" id="okta-signin-submit" data-type="save" /></div>
                                                              </form><div className="auth-footer">     
                                                               <a href="https://sjsu.okta.com/login/login.htm?fromURI=%2Fapp%2Fsanjosestateuniversity_devshibbolethsp_1%2Fexka0rxhebkgWRJIt0x7%2Fsso%2Fsaml%3FSAMLRequest%3DfVJdU4JAFP0rzL7LApXkjjhD%252BhCNFaNWM704C1xlFXZp72L67wOptId8vufjnnPvEHlZVCysTS5n8FEDGmtfFhLZcRCQWkumOApkkpeAzKRsHj5OmWc7rNLKqFQVxAoRQRuh5FhJrEvQc9A7kcLLbBqQ3JgKGaUiqxzXxg3WNmQ1neciSVQBJrcRFW1VPRo%252FzxfEmjRrCMlbwRP9SFRbw%252B1UlZRXFUUuNwobLDdQS7EDjcIclhns8Fcbq6VLYb%252Fljt7nkGzXb7OHyDh7n7ambUhiRZOALP3%252BKrm98dOBu%252BKZd5WA72cpeCnP%252BtduP%252FEaGGINkWzspAmI57iDnuP1XH%252FhuMzxmee%252FEyv%252BruROyEzI9eX%252Bkg6E7H6xiHtd9Nc2RBu7AZDRsF2QHY312V0uy%252FKfY5DRP9Wf6hnSM4fOrmJPjWQ0iVUh0oMVFoX6HGtoOg6IS%252Bioo%252Fz9mdEX%26RelayState%3Dss%253Amem%253A89f5d47d34c0b2cb8e17ff1e01cd9e961c732f389883fc502bd04b2ff55a8223#" data-se="needhelp" className="link help js-help">      Need help signing in?    </a>      
                                                               <ul className="help-links js-help-links" style={{display: 'none'}}>       
                                                                <li>       
                                                               <a href="https://sjsu.okta.com/login/login.htm?fromURI=%2Fapp%2Fsanjosestateuniversity_devshibbolethsp_1%2Fexka0rxhebkgWRJIt0x7%2Fsso%2Fsaml%3FSAMLRequest%3DfVJdU4JAFP0rzL7LApXkjjhD%252BhCNFaNWM704C1xlFXZp72L67wOptId8vufjnnPvEHlZVCysTS5n8FEDGmtfFhLZcRCQWkumOApkkpeAzKRsHj5OmWc7rNLKqFQVxAoRQRuh5FhJrEvQc9A7kcLLbBqQ3JgKGaUiqxzXxg3WNmQ1neciSVQBJrcRFW1VPRo%252FzxfEmjRrCMlbwRP9SFRbw%252B1UlZRXFUUuNwobLDdQS7EDjcIclhns8Fcbq6VLYb%252Fljt7nkGzXb7OHyDh7n7ambUhiRZOALP3%252BKrm98dOBu%252BKZd5WA72cpeCnP%252BtduP%252FEaGGINkWzspAmI57iDnuP1XH%252FhuMzxmee%252FEyv%252BruROyEzI9eX%252Bkg6E7H6xiHtd9Nc2RBu7AZDRsF2QHY312V0uy%252FKfY5DRP9Wf6hnSM4fOrmJPjWQ0iVUh0oMVFoX6HGtoOg6IS%252Bioo%252Fz9mdEX%26RelayState%3Dss%253Amem%253A89f5d47d34c0b2cb8e17ff1e01cd9e961c732f389883fc502bd04b2ff55a8223#" data-se="forgot-password" className="link js-forgot-password">        Reset my password      </a>     
                                                                </li>                        <li>       
                                                                     <a href="http://www.sjsu.edu/it/self-service/password/index.php" data-se="help-link" className="link js-help-link" target="_blank">        Help      
                                                                     </a>      </li>  
                                                                       </ul>  
                                                            </div>
                                                    </div>
                                            </div>
                                       </div>  
                                    </div>
                                </div>
              
                   
          </div>
      )
  }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
