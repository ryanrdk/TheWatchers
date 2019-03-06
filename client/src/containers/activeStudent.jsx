import React from 'react';
import { connect } from 'react-redux';
import { populateBootcampers } from '../actions';

class ActiveStudent extends React.Component {
  componentDidMount() {
    if (!this.props.activeStudent.isPopulated) {
      const popp = async () => {
        const refProp = await this.props.compRef;
        await this.props.populateBootcampers(refProp);
      };
      popp();
    } else {
      const populateData = async () => {
        const comp = await this.props.compRef;
        comp.current.updateStats(this.props.activeStudent.popData);
      };
      populateData();
    }
    // console.log("stateerr", this.props)
  }
  render() {
    return null;
  }
}

// The glue between React and Redux
function mapStateToProps(state) {
  // Whatever gets returned from here will show up as props activeStudent
  return {
    activeStudent: state.activeStudent
  };
}

export default connect(
  mapStateToProps,
  { populateBootcampers }
)(ActiveStudent);
