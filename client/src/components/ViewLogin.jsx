import React from 'react';
import { Grid, Header, Image, Segment } from 'semantic-ui-react';
import GoogleAuth from './GoogleAuth';
import history from '../history';

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSinIn: false
    };
  }

  componentDidMount() {
    var x = null;
    if ((x = window.gapi.auth2.getAuthInstance().isSignedIn.get())) {
      if (x === true) {
        history.push('/');
      }
    }
  }

  clickMe() {
    var x = window.gapi.auth2.getAuthInstance().isSignedIn.get();
    console.log('Help Vuruseer: ' + x);
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Image src='https://www.wethinkcode.co.za/assets/images/wethinkcode-logo-blue.png' />{' '}
              Log-in to your account
            </Header>

            <Segment Raised>
              <img
                height='192'
                width='192'
                src='https://lh3.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAAAAAA/OixOH_h84Po/s1344-p-rw/photo.jpg'
              />
              <GoogleAuth />
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginView;
