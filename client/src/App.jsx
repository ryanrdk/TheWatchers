import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import './components/styles.css';
import history from './history';
import ViewLogin from './components/ViewLogin';
import ViewDemographics from './components/ViewDemographics';
import ViewSelected from './components/ViewSelected';
import ViewMailingList from './components/ViewMailingList';

let loggedIn = false;

class App extends Component {
  autherise() {
    if (this.props.auth.isSignedIn && this.props.auth.userId != null) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    return loggedIn;
  }

  render() {
    return (
      <div
        className='full-screen'
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexWrap: 'wrap'
        }}>
        <Router history={history}>
          <div className='full-screen'>
            <Route
              exact
              path='/'
              render={() =>
                this.autherise() ? <Redirect to='/demographs' /> : <ViewLogin />
              }
            />
            <Route
              exact
              path='/demographs'
              render={() =>
                this.autherise() ? <ViewDemographics /> : <Redirect to='/' />
              }
            />
            <Route
              exact
              path='/watcher'
              render={() =>
                this.autherise() ? <ViewSelected /> : <Redirect to='/' />
              }
            />
            <Route
              exact
              path='/mailinglist'
              render={() =>
                this.autherise() ? <ViewMailingList /> : <Redirect to='/' />
              }
            />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props auth
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
