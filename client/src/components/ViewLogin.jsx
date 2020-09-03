import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';

/**
 *  This is simply a basic login view, or rather component that we use at the beginning of the user journey.
 *  It is the parent component to the Google Auth button that handles our authentication.
 */

class LoginView extends React.Component {
  render() {
    return (
      <Grid
        style={{ height: '100%', width: '100%' }}
        verticalAlign='middle'
        textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image
              alt='wtc_'
              src='https://images.squarespace-cdn.com/content/5de86a02319db87bbb0a1449/1575940079269-11C8RJ3FNW1M1IRWG7GF/wethinkcode-logo-blue.png?content-type=image%2Fpng'
            />{' '}
            Log-in to your account
          </Header>
          <Segment raised>
            <img
              alt='google'
              height='192'
              width='192'
              src='https://lh3.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s1344-p-rw/photo.jpg'
            />
            <div style={{ margin: '12px' }} />
            <GoogleAuth />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginView;
