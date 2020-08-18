import React from 'react';
import SelectorSelected from './SelectorSelected';
//import SelectorDays from './SelectorDays';
import Header from './Header';
import ActiveStudent from '../containers/activeStudent';
// import { GET_ALL_BOOTCAMPERS } from '../queries';

class ViewSelected extends React.Component {
  constructor(props) {
    super(props);
    this.selectedSelectorElement = React.createRef();
    this.daysSelectorElement = React.createRef();
    this.state = {
      display: 'SelectorSelected',
      active_selection: [
        { key: 'All', value: 'All', text: 'All Students' },
        { key: 'Selected', value: 'Selected', text: 'Selected' },
        { key: 'Not Selected', value: 'Not Selected', text: 'Not Selected' }
      ],
      days_selection: [
        { key: 'None', value: 'None', text: 'None' },
        { key: 'day00', value: 'day00', text: 'Day 00' },
        { key: 'day01', value: 'day01', text: 'Day 01' }
      ]
    };
  }

  componentDidMount() {
    let studentNode = document.getElementById('student').lastChild;
    document.getElementById('curr-view').appendChild(studentNode);
    // GET_ALL_BOOTCAMPERS(this.selectedSelectorElement);
  }

  render() {
    return (
      <div style={{ margin: '8px' }}>
        <ActiveStudent compRef={this.selectedSelectorElement} />
        <Header logout={this.props.logout}/>
        <div id='student' style={{ clear: 'both', float: 'left' }}>
          <div>
            <SelectorSelected
              ref={this.selectedSelectorElement}
              active_selection={this.state.active_selection}
            />
            {/* <div style={{ float: 'right' }}> */}
            {/* <SelectorDays
              ref={this.daysSelectorElement}
              days_selection={this.state.days_selection}
            /> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSelected;
