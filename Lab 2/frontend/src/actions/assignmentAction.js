import { RETRIEVE_ASSIGNMENT, ACTIVE_ASSIGNMENT, GET_ERRORS } from '../actions/types'
import axios from 'axios'

export const retrieveAssginment = (CourseId, faculty_email) => dispatch => {
   
    axios.get(`/assignment/listAssignments/${CourseId}/${faculty_email}`)
       .then(res => 
            {
            localStorage.setItem('assignment', JSON.stringify(res.data))
            dispatch({
                type: RETRIEVE_ASSIGNMENT,
                payload: res.data
            })

            }
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_ASSIGNMENT,
                 payload: {}
             })
        )
}

export const createAssignment = data => dispatch => {
   
    axios.post('/assignment/createAssignment', data)
         .then(res => console.log(res.data))
         .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
         )
}


export const activeAssignment = (data) => {
    return {
        type: ACTIVE_ASSIGNMENT,
        payload: data
    }
}
