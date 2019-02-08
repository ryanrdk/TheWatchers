import React from 'react';
import CampusSelector from './CampusSelector';
import StatusSelector from './StatusSelector';

class Demographics extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        campus_selection: [
            { key: 'ALL', value: 'ALL', text: 'All Capmuses'},
            { key: 'CPT', value: 'CPT', text: 'Cape Town'},
            { key: 'JHB', value: 'JHB', text: 'Johannesburg'},
        ],
        status_selection: [
            { key: 'allstatus', value: 'allstatus', text: 'All statuses'},
            { key: 'active', value: 'active', text: 'Active'},
            { key: 'selected', value: 'selected', text: 'Selected'},
            { key: 'no_show', value: 'no_show', text: 'No Show'},
            { key: 'quit', value: 'quit', text: 'Quit'},
        ]
    };
}

componentDidMount() {
    // const jay = require('../bootcampers.json');
    // this.setState({ users: jay });
    // console.log("demograph HERE", this.state);
}
render() {
    return (
        // console.log("YAYYY HERE", this.state),
        <div>
        <div>
            <CampusSelector campus_selection={this.state.campus_selection} />
        </div>
        
        <div>
            <StatusSelector status_selection={this.state.status_selection}/>
        </div>
        </div>
    );
}
}

export default Demographics;
