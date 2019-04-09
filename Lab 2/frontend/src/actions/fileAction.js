import { RETRIEVE_FILE, ACTIVE_FILE } from '../actions/types'
import axios from 'axios'

export const listFiles = (CourseId, email) => dispatch => {
   
    axios.get(`/file/listFiles/${CourseId}/${email}`)
       .then(res => 
            {
            localStorage.setItem('file', JSON.stringify(res.data))
            dispatch({
                type: RETRIEVE_FILE,
                payload: res.data
            })

            }
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_FILE,
                 payload: {}
             })
        )
}


export const activeFile = (data) => {
    return {
        type: ACTIVE_FILE,
        payload: data
    }
}
