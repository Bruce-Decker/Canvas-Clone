import { GET_ERRORS, ACTIVE_USER, ACTIVE_FACULTY } from './types'
import axios from 'axios'

import tokenHeader from '../utility/tokenHeader'
import jwt_decode from 'jwt-decode'


export const registerUser = (userData, history) => dispatch => {
    axios.post('/createBasicUser', userData)
         .then(res => {
            
            const { token } = res.data
            console.log(res.data)
            localStorage.setItem('token', token)
            tokenHeader(token)
            const decrypt_data = jwt_decode(token)
            console.log("data is 1" + JSON.stringify(decrypt_data))
            dispatch(activeUser(decrypt_data))

           // history.push('/login')
            
         }
            
        )
         .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
         )
}

export const createProfile = (userData) => dispatch => {
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    console.log("sdfsdf")
    console.log("form data " + userData )
     axios.post('/createProfile', userData)
          .then(res => {
              //console.log(res.data)
              window.location.reload()
          })
          .catch(err => 
           
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
    
            })
        )
}

export const loginUser = (userData) => dispatch => {
    console.log("user")
    axios.post('/login', userData)
        .then(res => {
            const { token } = res.data
            console.log(res.data)
            localStorage.setItem('token', token)
            tokenHeader(token)
            const decrypt_data = jwt_decode(token)
            console.log("data is 1" + JSON.stringify(decrypt_data))
            dispatch(activeUser(decrypt_data))

        })
        .catch(err => 
           
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }))

}

export const loginFaculty = (userData) => dispatch => {
    console.log("faculty")
    axios.post('/facultyLogin', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('token', token)
            tokenHeader(token)
            const decrypt_data = jwt_decode(token)
            console.log("data is " + JSON.stringify(decrypt_data))
            dispatch(activeFaculty(decrypt_data))

        })
        .catch(err => 
           
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }))

}

export const logout = () => dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('isFaculty')
    tokenHeader(false)
   
    dispatch(activeUser({}))
}

export const activeUser = (decrypt_data) => {
    return {
        type: ACTIVE_USER,
        payload: decrypt_data
    }
}

export const activeFaculty = (decrypt_data) => {
    return {
        type: ACTIVE_FACULTY,
        payload: decrypt_data
    }
}