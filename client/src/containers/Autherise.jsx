import React from 'react';
import { Segment } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';

const Autherise = props => {
  let authState = false;

  if (window.gapi.auth2 != null) {
    authState = window.gapi.auth2.getAuthInstance().isSignedIn.get();
    if (this.state.isSignedIn === false) {
      setTimeout(props.updateState(authState), 2000);
    }
  } else {
    authState = false;
  }
  return (
    <div
      style={{ height: '500px', width: '100%', zIndex: '-1' }}
      onMouseOver={() => props.updateState(authState)}>
      <Segment raised>
        <img
          height='192'
          width='192'
          src='https://lh3.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s1344-p-rw/photo.jpg'
        />
        <GoogleAuth />
      </Segment>
    </div>
  );
};

export default Autherise;
