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
import Authorise from './containers/Authorise';

let loggedIn;

/**
 *  Our App class. This is our first typical react component.
 *  The App class is also where you typically handle your routing and navigation.
 *  Because routing is located here, 
 *  I take advantage of that and implement our auth restrictions on those routes.
 *  If our auth state in our Redux store is false, well you may try to force a route and fail.
 */

class App extends Component {
  authorise() {
    if (this.props.auth.isSignedIn) {
      loggedIn = true;
    } else if (!this.props.auth.isSignedIn) {
      loggedIn = false;
    } else if (this.props.auth.isSignedIn === null) {
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
                this.authorise() ? (
                  <Redirect to='/demographs' />
                ) : (
                  <ViewLogin signedIn={this.authorise()} />
                )
              }
            />
            <Route
              exact
              path='/demographs'
              render={() =>
                this.authorise() ? <ViewDemographics /> : <Redirect to='/' />
              }
            />
            <Route
              exact
              path='/watcher'
              render={() =>
                this.authorise() ? <ViewSelected /> : <Redirect to='/' />
              }
            />
            <Route
              exact
              path='/mailinglist'
              render={() =>
                this.authorise() ? <ViewMailingList /> : <Redirect to='/' />
              }
            />
            <Route path='/authorise' exact component={Authorise} />
          </div>
        </Router>
      </div>
    );
  }
}

/**
 *  The mapStateToProps is a very nifty way of globalising our auth state within this class.
 */

function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props auth
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(App);
