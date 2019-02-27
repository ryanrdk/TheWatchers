import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeStudentReducer from './activeStudentReducer';

export default combineReducers({
  auth: authReducer,
  activeStudent: activeStudentReducer
});
