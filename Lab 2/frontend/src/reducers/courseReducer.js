import { RETRIEVE_COURSE } from '../actions/types'

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
      default:
          return state;
     }
}