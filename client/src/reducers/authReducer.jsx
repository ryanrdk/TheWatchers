import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

/**
 *  Our auth reducer maps our state based on the type of action received.
 *  Eg. are we signing in or signing out?
 *  If a payload is parcelled in with the type, we can define certain fields accordingly.
 */

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
};
