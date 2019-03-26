import { RETRIEVE_COURSE } from '../actions/types'
import axios from 'axios'

export const retriveCourse = (data) => dispatch => {
    console.log(data)
    axios.get(`/course/retriveCourse/${data.CourseId}/${data.faculty_email}`)
       .then(res => 
        
           dispatch({
               type: RETRIEVE_COURSE,
               payload: res.data
           })
        )
        .catch(err => 
             dispatch({
                 type: RETRIEVE_COURSE,
                 payload: {}
             })
        )
}