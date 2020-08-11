import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';

class LoginView extends React.Component {
  render() {
    return (
      <Grid
        // textAlign='center'
        style={{ height: '100%', width: '100%' }}
        verticalAlign='middle'
        textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image
              alt='wtc_'
              src='//static1.squarespace.com/static/5de86a02319db87bbb0a1449/t/5deeefefab886c6b1e470b56/1597147394134/?format=1500w'
              // src='https://www.wethinkcode.co.za/assets/images/wethinkcode-logo-blue.png'
            />{' '}
            Log-in to your account
          </Header>
          <Segment raised>
            <img
              alt="google_"
              height='192'
              width='192'
              src='https://cdn.worldvectorlogo.com/logos/google-icon.svg'
              // src='https://lh3.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s1344-p-rw/photo.jpg'
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
