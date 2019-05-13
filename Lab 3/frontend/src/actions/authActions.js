import { ACTIVE_USER, ACTIVE_FACULTY } from './types'
import jwt_decode from 'jwt-decode'

export const registerUser = () => dispatch => {
    var token = localStorage.getItem('jwtToken')
    const decrypt_data = jwt_decode(token)
    console.log("in redux " + decrypt_data)
    console.log(decrypt_data)
    dispatch(activeUser(decrypt_data))


}

export const activeUser = (decrypt_data) => {
    return {
        type: ACTIVE_USER,
        payload: decrypt_data
    }
}


export const activeFaculty= (decrypt_data) => {
    return {
        type: ACTIVE_FACULTY,
        payload: decrypt_data
    }
}


export const loginFaculty = (userData) => dispatch => {
    var token = localStorage.getItem('jwtToken')  
    const decrypt_data = jwt_decode(token)
    decrypt_data.token = token
    localStorage.setItem('isFaculty', 'yes')
    dispatch(activeFaculty(decrypt_data))
}

export const loginUser = (userData) => dispatch => {
  
            var token = localStorage.getItem('jwtToken')
          
            const decrypt_data = jwt_decode(token)
            decrypt_data.token = token
         
            dispatch(activeUser(decrypt_data))
}


export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('isFaculty')
    dispatch(activeUser({}))
}
