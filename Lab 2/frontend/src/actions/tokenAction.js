import axios from 'axios';
import { ACTIVE_TOKEN,  GET_ERRORS} from './types'


export const createToken = (data) => dispatch => {
    
            dispatch({
                type: ACTIVE_TOKEN,
                payload: data
            })
            localStorage.setItem('courseToken', JSON.stringify(data))

    
}

export const activeToken = (data) => {
  return {
      type: ACTIVE_TOKEN,
      payload: data
  }
}