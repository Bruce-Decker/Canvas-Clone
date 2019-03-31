import { RETRIEVE_COURSE, ACTIVE_COURSE, RESET_COURSE } from '../actions/types'
import axios from 'axios'

export const retriveCourse = (data) => dispatch => {
    console.log(data)
    axios.get(`/course/retriveCourse/${data.CourseId}/${data.faculty_email}`)
       .then(res => 
            {
            localStorage.setItem('course', JSON.stringify(res.data))
            dispatch({
                type: RETRIEVE_COURSE,
                payload: res.data
            })

            }
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_COURSE,
                 payload: {}
             })
        )
}


export const activeCourse = (course) => {
    return {
        type: ACTIVE_COURSE,
        payload: course
    }
}

export const resetCourse = () => {
    return {
        type: RESET_COURSE
    }
}