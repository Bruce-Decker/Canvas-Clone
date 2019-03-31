import { RETRIEVE_COURSE, ACTIVE_COURSE, RESET_COURSE } from '../actions/types'

const firstState = {
    info: null
} 

export default function(state = firstState, action) {
    switch(action.type) {
     
      case RETRIEVE_COURSE:
          return {
              ...state,
              info: action.payload,
          }

    case ACTIVE_COURSE:
          return {
              ...state,
              info: action.payload,
          }
    case RESET_COURSE:
          return {
              ...state,
              info: null
          }
      default:
          return state;
     }
}