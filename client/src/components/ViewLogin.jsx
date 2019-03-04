import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';

class LoginView extends React.Component {
  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%', width: '100%' }}
        verticalAlign='middle'
        textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image
              alt='wtc_'
              src='https://www.wethinkcode.co.za/assets/images/wethinkcode-logo-blue.png'
            />{' '}
            Log-in to your account
          </Header>
          <Segment raised>
            <img
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
