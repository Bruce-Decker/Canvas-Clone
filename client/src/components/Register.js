import React, { Component } from 'react'
import RegisterBanner from './RegisterBanner'

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
  render() {
      return (
          <div className = "Register">
             <RegisterBanner />
          </div>
          )
      }
    
    }
    
    export default Register; 