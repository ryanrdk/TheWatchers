import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

/**
 *  Taking a look at our Google Authentication class.
 *  We make use of the most used lifecycle method here: componentDidMount()
 *  Think of it as when the component is ready, do this.
 *  'This' being: initialising the G API client with our client secret and specified domain.
 */
class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '575180197639-t4sul1unsb6fuot757sic44qg4odeam6.apps.googleusercontent.com',
          scope: 'email',
          prompt: 'select_account',
          hosted_domain: 'student.wethinkcode.co.za'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

/**
 *  This is where we render the sign in button and style it briefly
 *  Depending on our auth state, it can be a sign in or logout button.
 *  It is quite nifty and reusable.
 */
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={this.onSignOutClick}
          className='fluid ui red google button'>
          <i className='google icon' />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          id='auth'
          onClick={this.onSignInClick}
          className='fluid ui blue button'>
          <i className='google icon' />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return (
      <div className='fluid ui horizontally fitted container'>
        {this.renderAuthButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
