import { combineReducers } from 'redux';
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import userProfileReducer from './userProfileReducer'
import courseReducer from './courseReducer'
import gradeReducer from './gradeReducer'
import assignmentReducer from './assignmentReducer'
import fileReducer from './fileReducer'
import quizReducer from './quizReducer'
import tokenReducer from './tokenReducer'

export default combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
    course: courseReducer,
    gradeBook: gradeReducer,
    assignment: assignmentReducer,
    quiz: quizReducer,
    file: fileReducer,
    token: tokenReducer,
    errors: errorReducer
})