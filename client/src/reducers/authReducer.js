import { TEST_DISPATH } from '../actions/types'


const initialState = {
    isAuthenticated: false,
    user: {}
   
}

export default function(state = initialState, action) {
    switch(action.type) {
       case TEST_DISPATH:
          return {
              ...state,
              user: action.payload
          }
          default:
             return state;
    }
}