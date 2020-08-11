import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';

class Autherise extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      isSignedIn: this.props.auth.isSignedIn
    };
  } */

  componentDidUpdate() {}

  componentDidMount() {
    console.log('Mother o fa M ount / ' + this.state.isSignedIn);
  }

  render() {
    return (
      <Grid
        // textAlign='center'
        style={{ height: '100%', width: '100%' }}
        verticalAlign='middle'
        textAlign='center'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment raised>
            <Loader active inline='centered' size='massive'>
              Loading
            </Loader>
            <GoogleAuth id='authentic' />
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props auth
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Autherise);
