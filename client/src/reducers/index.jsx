import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  session: sessionReducer
});
