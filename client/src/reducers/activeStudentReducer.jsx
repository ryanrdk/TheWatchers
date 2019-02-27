import { POPULATE_BOOTCAMPERS } from '../actions/types';

const INITIAL_STATE = {
    isPopulated: false,
    popData: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POPULATE_BOOTCAMPERS:
            {
                // console.log("action", action.payload)
                return { ...state, isPopulated: true, popData: action.payload };
            }
        default:
            return state;
    }
};
