import { ACTIVE_USER, ACTIVE_FACULTY } from '../actions/types'
import isEmpty from '../validation/isEmpty'


const initialState = {
    isAuthenticated: false,
    isFaculty: false,
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
        case ACTIVE_FACULTY:
            return {
                ...state,
                 isAuthenticated: !isEmpty(action.payload),
                 isFaculty: true,
                 user: action.payload
            }
        
          default:
             return state;
    }
}