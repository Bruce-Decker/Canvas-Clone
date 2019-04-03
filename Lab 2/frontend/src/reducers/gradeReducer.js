import { RETRIEVE_GRADE, ACTIVE_GRADE } from '../actions/types'

const firstState = {
    grade: null
} 

export default function(state = firstState, action) {
    switch(action.type) {

      case RETRIEVE_GRADE:
          return {
              ...state,
              grade: action.payload,
          
          }

      case ACTIVE_GRADE:
          return {
              ...state,
              grade: action.payload,
          
          }
      default:
          return state;
     }
}