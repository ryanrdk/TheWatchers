import { SIGN_IN, SIGN_OUT, POPULATE_BOOTCAMPERS } from './types';
import { GET_ALL_BOOTCAMPERS } from '../queries'

/**
 *  Actions are objects that contain two important fields, 
 *  usually type (required) and payload (optional) 
 *  that send data from your application to your store.
 */

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

export const populateBootcampers = async componentRef => {
  const result = await GET_ALL_BOOTCAMPERS(componentRef)
  if (result.data !== null && result.data !== undefined) {
    if (componentRef.current !== null && componentRef.current !== undefined) {
      componentRef.current.updateStats(result.data.getAllBootcampers);
    }
  }
  return ({
    type: POPULATE_BOOTCAMPERS,
    payload: result.data.getAllBootcampers
  })
};