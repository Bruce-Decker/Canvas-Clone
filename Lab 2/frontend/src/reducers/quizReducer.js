import { RETRIEVE_QUIZ, ACTIVE_QUIZ  } from '../actions/types'

const firstState = {
    quizzes: {}
} 

export default function(state = firstState, action) {
    switch(action.type) {
     
      case RETRIEVE_QUIZ:
          return {
              ...state,
              quizzes: action.payload,
          }

    case ACTIVE_QUIZ:
          return {
              ...state,
              quizzes: action.payload,
          }
      default:
          return state;
     }
}