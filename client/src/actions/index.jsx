import { SIGN_IN, SIGN_OUT, POPULATE_BOOTCAMPERS } from './types';
import { GET_ALL_BOOTCAMPERS } from '../queries'
import { GET_ALL_USERS } from '../api_req/getUsers'

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const populateBootcampers = async (componentRef) => {
  // const result = await GET_ALL_BOOTCAMPERS(componentRef)
  // console.log("beginning", result)
  // if (result.data !== null && result.data !== undefined) {
  //   if (componentRef.current !== null && componentRef.current !== undefined) {
  //     componentRef.current.updateStats(result.data.getAllBootcampers);
  //   }
  // }

  const bootcampers = GET_ALL_USERS();
  bootcampers.then((update) => {
    if (componentRef.current !== null && componentRef.current !== undefined) {
      componentRef.current.updateStats(update);
    }
  })
  return ({
    type: POPULATE_BOOTCAMPERS,
    // payload: result.data.getAllBootcampers
    payload: bootcampers
  })
};