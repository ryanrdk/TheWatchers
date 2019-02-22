import React, { Component } from 'react';
import { connect } from 'react-redux'; // -> merge between react and redux. They are separate libraries.

let x = 'false';

class authState extends Component {
  renderList() {
    if (this.props.auth.isSignedIn) {
      x = 'true';
    } else {
      x = 'false';
    }
    return (
      <div>
        <li>{this.props.auth.userId}</li>
        <li>{x}</li>
      </div>
    );
  }
  render() {
    return <div>{this.renderList()}</div>;
  }
}

// The glue between React and Redux
function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props auth
  return {
    auth: state.auth
  };
}

/*
 *	Connect takes a function and a component, and produces a container.
 *	The container is the 'smart' component that is aware of the state
 *	within redux. The mapStateToProps () is esp. key here. It's first
 *	argument is the state, and returns an object. Whichever object is
 *	returned, it will be available to our component through this.props.
 *	NB: Whenever the application state changes. The object in the mSTP
 *	function, will be assigned as props to the component immediately!
 */
export default connect(mapStateToProps)(authState);
