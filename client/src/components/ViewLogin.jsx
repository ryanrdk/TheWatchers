import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import Autherise from '../containers/Autherise';
import history from '../history';
import GoogleAuth from '../containers/GoogleAuth';

class LoginView extends React.Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    window.setInterval(this.updateState, 3000);
  }

  updateState() {
    if (window.gapi.auth2 != null) {
      console.log('LOOK: ' + this.state.isSignedIn);
      this.setState({
        isSignedIn: window.gapi.auth2.getAuthInstance().isSignedIn.get()
      });
      if (this.state.isSignedIn === true) {
        window.clearInterval(this.updateState);
        console.log('true');
        history.push('/demographs');
      } else if (this.state.isSignedIn === false) {
        console.log('fml');
      }
    }
    this.setState({ isSignedIn: this.state.isSignedIn });
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
          <Segment raised>
            <img
              height='192'
              width='192'
              src='https://lh3.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s1344-p-rw/photo.jpg'
            />
            <GoogleAuth />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default LoginView;
