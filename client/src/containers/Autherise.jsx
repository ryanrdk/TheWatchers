import React from 'react';

const Autherise = props => {
  let authState = false;

  if (window.gapi.auth2 != null) {
    authState = window.gapi.auth2.getAuthInstance().isSignedIn.get();
  } else {
    authState = false;
  }
  return (
    <p id='auth' onLoad={() => props.updateState(authState)}>
      Is: {authState}
    </p>
  );
};

export default Autherise;
