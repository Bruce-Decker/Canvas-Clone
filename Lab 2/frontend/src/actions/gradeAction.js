import { RETRIEVE_GRADE, ACTIVE_GRADE } from './types'
import axios from 'axios'

export const retrieveGrade = (CourseId, email) => dispatch => {
    
    axios.get(`/grade/getGrades/${CourseId}/${email}`)
       .then(res =>  {
        localStorage.setItem('grade', JSON.stringify(res.data))
        
           dispatch({
               type: RETRIEVE_GRADE,
               payload: res.data
           })
        }
          
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_GRADE,
                 payload: {}
             })
        )
}

export const activeGrade = (grade) => {
    return {
        type: ACTIVE_GRADE,
        payload: grade
    }
}
