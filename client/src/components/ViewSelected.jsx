import React from 'react';
import SelectorSelected from './SelectorSelected';
import Header from './Header';
import ActiveStudent from '../containers/activeStudent';

/**
 * The Selected View displays our tables that displays the students listed 
 * with a checkbox that is selected or not selected for enrollment.
 */

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
  }

  render() {
    return (
      <div style={{ margin: '8px' }}>
        <ActiveStudent compRef={this.selectedSelectorElement} />
        <Header />
        <div id='student' style={{ clear: 'both', float: 'left' }}>
          <div>
            <SelectorSelected
              ref={this.selectedSelectorElement}
              active_selection={this.state.active_selection}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewSelected;
