import axios from 'axios';
import { RETRIEVE_PROFILE, LOAD_PROFILE, GET_ERRORS, RESET_PROFILE, ACTIVE_PROFILE} from './types'
import tokenHeader from '../utility/tokenHeader'


export const retrieveProfile = (email) => dispatch => {
    var token = localStorage.getItem('token')
    //dispatch(configureProfile());
    tokenHeader(token)
    axios.get(`/profile/viewProfile/${email}`)
       .then(res =>  {
        localStorage.setItem('profile', JSON.stringify(res.data))
           dispatch({
               type: RETRIEVE_PROFILE,
               payload: res.data
           })
        }
          
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_PROFILE,
                 payload: {}
             })
        )
}

export const createProfile = (userData) => dispatch => {
    //axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    console.log("create Profile")
    console.log(userData)
     axios.post('/profile/createProfile', userData)
          .then(res => {
            // var profile = JSON.parse(res.data)
            // console.log(profile)
            // console.log(JSON.stringify(profile))
            //localStorage.removeItem('profile')
           
            dispatch({
                type: ACTIVE_PROFILE,
                payload: res.data
            })
            localStorage.setItem('profile', JSON.stringify(res.data))
            window.location.reload()
           
          })
          .catch(err => 
           
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
    
            })
        )
}

export const activeProfile = (profile) => {
    return {
        type: ACTIVE_PROFILE,
        payload: profile
    }
}


export const configureProfile = () => {
    return {
      type: LOAD_PROFILE
    };
  };
  

export const resetProfile = () => {
    return {
        type: RESET_PROFILE
    }
}