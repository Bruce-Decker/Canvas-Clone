import { ACTIVE_USER } from '../actions/types'
import isEmpty from '../validation/isEmpty'


const initialState = {
    isAuthenticated: false,
    user: {}
   
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ACTIVE_USER:
             return {
                 ...state,
                 isAuthenticated: !isEmpty(action.payload),
                 user: action.payload
             }
        
          default:
             return state;
    }
}