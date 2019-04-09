import { RETRIEVE_ASSIGNMENT, ACTIVE_ASSIGNMENT } from '../actions/types'

const firstState = {
    assignments: {}
} 

export default function(state = firstState, action) {
    switch(action.type) {
     
      case RETRIEVE_ASSIGNMENT:
          return {
              ...state,
              assignments: action.payload,
          }

      case ACTIVE_ASSIGNMENT:
          return {
              ...state,
              assignments: action.payload,
          }
      default:
          return state;
     }
}