import React from 'react';
import CampusSelector from './CampusSelector';
import StatusSelector from './StatusSelector';
import { GET_ALL_BOOTCAMPERS, GET_BOOTCAMPERS_BY_GENDER } from '../queries';

class Demographics extends React.Component {
    constructor(props) {
        super(props);
        this.campusSelectorElement = React.createRef()
        this.state = {
            campus_selection: [
                { key: 'ALL', value: 'ALL', text: 'All Capmuses' },
                { key: 'CPT', value: 'CPT', text: 'Cape Town' },
                { key: 'JHB', value: 'JHB', text: 'Johannesburg' },
            ],
            status_selection: [
                { key: 'allstatus', value: 'allstatus', text: 'All statuses' },
                { key: 'active', value: 'active', text: 'Active' },
                { key: 'selected', value: 'selected', text: 'Selected' },
                { key: 'no_show', value: 'no_show', text: 'No Show' },
                { key: 'quit', value: 'quit', text: 'Quit' },
            ],
            demoCount: {
                capetown: {
                    male: { white: 0, black: 0, coloured: 0, indian: 0, chinese: 0 },
                    female: { white: 0, black: 0, coloured: 0, indian: 0, chinese: 0 }
                },
                johannesburg: {
                    male: { white: 0, black: 0, coloured: 0, indian: 0, chinese: 0 },
                    female: { white: 0, black: 0, coloured: 0, indian: 0, chinese: 0 }
                }
            }
        };
    }

    componentDidMount() {
        // const jay = require('../bootcampers.json');
        // this.setState({ users: jay });
        // console.log("demograph HERE", this.state);
        GET_ALL_BOOTCAMPERS(this.campusSelectorElement);
        GET_BOOTCAMPERS_BY_GENDER(this.campusSelectorElement, "male", true, "capetown")
    var campusNode = document.getElementById("campus").lastChild;
    var statusNode = document.getElementById("status").lastChild;
    document.getElementById("curr-view").appendChild(campusNode);
    document.getElementById("curr-view").appendChild(statusNode);
    }
    render() {
        return (
            // console.log("YAYYY HERE", this.state),
            <div>
                <div style={{ clear: 'both', float: 'left' }}>
                    <CampusSelector ref={this.campusSelectorElement} campus_selection={this.state.campus_selection} demoCount={this.state.demoCount} />
                </div>

                <div>
                    <StatusSelector status_selection={this.state.status_selection} />
                </div>
            </div>
        );
    }
}
render() {
    return (
      <div>
        <Header />
        <div id='campus' style={{ clear: "both", float: "left" }}>
            <CampusSelector ref={this.campusSelectorElement} campus_selection={this.state.campus_selection} />
        </div>
        <div id='status' style={{ clear: "both", float: "left" }}>
          <StatusSelector status_selection={this.state.status_selection} />
        </div>
      </div>
    );
  }
}

export default Demographics;
