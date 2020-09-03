import React from 'react';
import { connect } from 'react-redux';
import { populateBootcampers } from '../actions';

/**
 *  We call this container a lot. This is where we pass through refs of our other data tables (components)
 *  to this one in order to push that data to the redux store in the case it is not already there.
 */

class ActiveStudent extends React.Component {
    componentDidMount() {
        if (!this.props.activeStudent.isPopulated) {
            const refProp = this.props.compRef
            this.props.populateBootcampers(refProp)
        }
        else {
            const populateData = async () => {
                const comp = await this.props.compRef
                comp.current.updateStats(this.props.activeStudent.popData)
            }
            populateData();
        }
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

export default connect(mapStateToProps, { populateBootcampers })(ActiveStudent);