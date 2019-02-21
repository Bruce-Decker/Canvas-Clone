import axios from 'axios';
import { RETRIEVE_PROFILE, LOAD_PROFILE, GET_ERRORS, RESET_PROFILE} from './types'
import tokenHeader from '../utility/tokenHeader'

export const retrieveProfile = (email) => dispatch => {
    var token = localStorage.getItem('token')
    dispatch(configureProfile());
    tokenHeader(token)
    axios.get('/retrieveProfile', {
        params: {
            email: email
        }
    })
       .then(res => 
           dispatch({
               type: RETRIEVE_PROFILE,
               payload: res.data
           })
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_PROFILE,
                 payload: {}
             })
        )
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