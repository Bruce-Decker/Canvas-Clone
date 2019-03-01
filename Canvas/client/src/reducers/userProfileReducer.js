import { RETRIEVE_PROFILE, LOAD_PROFILE, RESET_PROFILE } from '../actions/types'

const firstState = {
    profile: null,
    profiles: null,
    loading: false
} 


export default function(state = firstState, action) {
    switch(action.type) {
      case LOAD_PROFILE:
        return {
            ...state,
            loading: true
        }
      case RETRIEVE_PROFILE:
          return {
              ...state,
              profile: action.payload,
              loading: false
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