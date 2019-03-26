import { combineReducers } from 'redux';
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import userProfileReducer from './userProfileReducer'
import courseReducer from './courseReducer'

export default combineReducers({
    auth: authReducer,
    userProfile: userProfileReducer,
    course: courseReducer,
    errors: errorReducer
})