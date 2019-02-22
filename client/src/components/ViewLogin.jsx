import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';
import Autherise from '../containers/Autherise';
import history from '../history';

class LoginView extends React.Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(bool) {
    this.setState({ isSignedIn: bool });
    console.log('LOOK: ' + this.state.isSignedIn);
  }

  render() {
    if (document.getElementById('auth')) {
      <Autherise updateState={this.updateState} />;
    }
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%', width: '100%' }}
        verticalAlign='middle'
        textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='https://www.wethinkcode.co.za/assets/images/wethinkcode-logo-blue.png' />{' '}
            Log-in to your account
          </Header>

          <Segment raised>
            <img
              height='192'
              width='192'
              src='https://lh3.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s1344-p-rw/photo.jpg'
            />
            <GoogleAuth />
            <Autherise updateState={this.updateState} />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginView;
