import React from 'react';
import SelectorCampus from './SelectorCampus';
import SelectorStatus from './SelectorStatus';
import Header from './Header';
import { GET_ALL_BOOTCAMPERS, GET_BOOTCAMPERS_BY_GENDER } from '../queries';

/**
 * Demographics VIEW ~~~ Overall view of Demographics
 * State -> campus_selection, status_selection and demoCount
 * Ref -> campusSelectorElement
 * Child Components -> SelectorCampus ~~ Selects the relevant campus to display
 * DemoStatsTable ~~ Displays demographics data on a table
 * DownloadCSV ~~ Download the data
 * -> SelectorStatus ~~ Selects the relevant active status
 * DemoStatusTable ~~ Display active status on a table
 * DownloadCSV ~~ Download the data
 */

class Demographics extends React.Component {
  constructor(props) {
    super(props);
    this.campusSelectorElement = React.createRef();
    this.statusSelectorElement = React.createRef();
    this.state = {
      campus_selection: [
        { key: 'ALL', value: 'ALL', text: 'All Capmuses' },
        { key: 'CPT', value: 'CPT', text: 'Cape Town' },
        { key: 'JHB', value: 'JHB', text: 'Johannesburg' }
      ],
      status_selection: [
        { key: 'allstatus', value: 'allstatus', text: 'All statuses' },
        { key: 'active', value: 'active', text: 'Active' },
        { key: 'selected', value: 'selected', text: 'Selected' },
        { key: 'no_show', value: 'no_show', text: 'No Show' },
        { key: 'quit', value: 'quit', text: 'Quit' }
      ],
      demoCount: {
        capetown: {
          male: {
            white: 0,
            black: 0,
            coloured: 0,
            indian: 0,
            chinese: 0,
            dem: 'CPT Male'
          },
          female: {
            white: 0,
            black: 0,
            coloured: 0,
            indian: 0,
            chinese: 0,
            dem: 'CPT Female'
          }
        },
        johannesburg: {
          male: {
            white: 0,
            black: 0,
            coloured: 0,
            indian: 0,
            chinese: 0,
            dem: 'JHB Male'
          },
          female: {
            white: 0,
            black: 0,
            coloured: 0,
            indian: 0,
            chinese: 0,
            dem: 'JHB Female'
          }
        }
      }
    };
  }

  componentDidMount() {
    GET_ALL_BOOTCAMPERS(this.statusSelectorElement);
    GET_BOOTCAMPERS_BY_GENDER(this.campusSelectorElement, 'male', 'capetown');
    GET_BOOTCAMPERS_BY_GENDER(this.campusSelectorElement, 'female', 'capetown');
    GET_BOOTCAMPERS_BY_GENDER(
      this.campusSelectorElement,
      'male',
      'johannesburg'
    );
    GET_BOOTCAMPERS_BY_GENDER(
      this.campusSelectorElement,
      'female',
      'johannesburg'
    );
    let campusNode = document.getElementById('campus').lastChild;
    let statusNode = document.getElementById('status').lastChild;
    document.getElementById('curr-view').appendChild(campusNode);
    document.getElementById('curr-view').appendChild(statusNode);
  }

  render() {
    return (
      <div>
        <Header />
        <div id='campus' style={{ clear: 'both', float: 'left' }}>
          <SelectorCampus
            ref={this.campusSelectorElement}
            campus_selection={this.state.campus_selection}
            demoCount={this.state.demoCount}
          />
        </div>
        <div id='status' style={{ clear: 'both', float: 'left' }}>
          <SelectorStatus
            ref={this.statusSelectorElement}
            status_selection={this.state.status_selection}
          />
        </div>
      </div>
    );
  }
}

export default Demographics;
