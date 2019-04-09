import { RETRIEVE_QUIZ, ACTIVE_QUIZ, GET_ERRORS } from '../actions/types'
import axios from 'axios'

export const retrieveQuiz = (CourseId, faculty_email) => dispatch => {
   
    axios.get(`/quiz/quizzes/${CourseId}/${faculty_email}`)
       .then(res => 
            {
            localStorage.setItem('quiz', JSON.stringify(res.data))
            dispatch({
                type: RETRIEVE_QUIZ,
                payload: res.data
            })

            }
        )
        .catch(err => 
             dispatch({
                type: GET_ERRORS,
                payload: err
             })
        )
}

export const activeQuiz = (data) => {
    return {
        type: ACTIVE_QUIZ,
        payload: data
    }
}