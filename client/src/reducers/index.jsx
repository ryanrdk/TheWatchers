import { combineReducers } from 'redux';
import authReducer from './authReducer';
import activeStudentReducer from './activeStudentReducer';

/**
 *  This is just a consolidation of our reducers for our redux store.
 *  As we see here, we only make use of 2 reducers.
 */

export default combineReducers({
  auth: authReducer,
  activeStudent: activeStudentReducer
});
