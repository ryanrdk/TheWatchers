import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
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
    if (this.state.isSignedIn === true) {
      history.push('/demographs');
    }
  }

  render() {
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
          <Autherise updateState={this.updateState} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginView;
