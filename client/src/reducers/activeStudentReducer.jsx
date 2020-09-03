import { POPULATE_BOOTCAMPERS } from '../actions/types';

const INITIAL_STATE = {
    isPopulated: false,
    popData: []
};

/**
 *  Our active student reducer maps our state based only on one case of populated the tables 
 *  with cached data in the store.
 *  Here the payload is the population data that will fill in the tables instead of making another API call.
 */

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULATE_BOOTCAMPERS:
            {
                return { ...state, isPopulated: true, popData: action.payload };
            }
        default:
            return state;
    }
};
