import { RETRIEVE_FILE, ACTIVE_FILE } from '../actions/types'

const firstState = {
    files: {}
} 

export default function(state = firstState, action) {
    switch(action.type) {
     
      case RETRIEVE_FILE:
          return {
              ...state,
              files: action.payload,
          }

      case ACTIVE_FILE:
          return {
              ...state,
              files: action.payload,
          }
      default:
          return state;
     }
}