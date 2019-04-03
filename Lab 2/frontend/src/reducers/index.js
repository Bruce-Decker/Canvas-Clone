import { combineReducers } from 'redux';
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import userProfileReducer from './userProfileReducer'
import courseReducer from './courseReducer'
import gradeReducer from './gradeReducer'

export default combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
    course: courseReducer,
    gradeBook: gradeReducer,
    errors: errorReducer
})