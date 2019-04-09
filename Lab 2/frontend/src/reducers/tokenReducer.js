import { RETRIEVE_TOKEN, ACTIVE_TOKEN } from '../actions/types'

const firstState = {
    token: {}
} 

export default function(state = firstState, action) {
    switch(action.type) {
     
      case RETRIEVE_TOKEN:
          return {
              ...state,
              token: action.payload,
          }

      case ACTIVE_TOKEN:
          return {
              ...state,
              token: action.payload,
             
          }
      default:
          return state;
     }
}