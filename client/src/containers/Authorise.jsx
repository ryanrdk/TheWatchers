import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import GoogleAuth from '../containers/GoogleAuth';

class Autherise extends React.Component {

  componentDidUpdate() {}

  componentDidMount() {
  }

  render() {
    return (
      <Grid
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
