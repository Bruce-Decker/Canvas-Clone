import { GET_ERRORS, ACTIVE_USER } from './types'
import axios from 'axios'

import tokenHeader from '../utility/tokenHeader'
import jwt_decode from 'jwt-decode'


export const registerUser = (userData, history) => dispatch => {
    axios.post('/createBasicUser', userData)
         .then(result => history.push('/login'))
         .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
         )
}

export const loginUser = (userData) => dispatch => {
    axios.post('/login', userData)
        .then(res => {
            const { token } = res.data
            localStorage.setItem('token', token)
            tokenHeader(token)
            const decrypt_data = jwt_decode(token)
            dispatch(activeUser(decrypt_data))

        })
        .catch(err => 
           
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data

        }))

    }

export const activeUser = (decrypt_data) => {
    return {
        type: ACTIVE_USER,
        payload: decrypt_data
    }
}