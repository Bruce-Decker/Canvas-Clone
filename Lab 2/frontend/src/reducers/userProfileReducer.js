import { RETRIEVE_PROFILE, LOAD_PROFILE, RESET_PROFILE, ACTIVE_PROFILE } from '../actions/types'

const firstState = {
    profile: null
  
} 


export default function(state = firstState, action) {
    switch(action.type) {
      case LOAD_PROFILE:
        return {
            ...state,
          
        }
      case RETRIEVE_PROFILE:
          return {
              ...state,
              profile: action.payload,
          
          }

     case ACTIVE_PROFILE: 
          return {
            ...state,
            profile: action.payload
          }
      case RESET_PROFILE:
           return {
               ...state,
               profile: null
           }
      default:
          return state;
     }
}