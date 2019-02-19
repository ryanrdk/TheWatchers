import React from 'react';
import SelectedSelector from './SelectedSelector';
import Header from './Header';
import { GET_ALL_BOOTCAMPERS } from '../queries';

class Selected extends React.Component {
  constructor(props) {
    super(props);
    this.selectedSelectorElement = React.createRef();
    this.state = {
      active_selection: [
        { key: 'All', value: 'All', text: 'All Students' },
        { key: 'Selected', value: 'Selected', text: 'Selected' },
        { key: 'Not Selected', value: 'Not Selected', text: 'Not Selected' }
      ]
    };
  }

  componentDidMount() {
    var studentNode = document.getElementById('student').lastChild;
    document.getElementById('curr-view').appendChild(studentNode);
    GET_ALL_BOOTCAMPERS(this.selectedSelectorElement);
  }
  render() {
    return (
      <div>
        <Header />
        <div id='student' style={{ clear: 'both', float: 'left' }}>
          <SelectedSelector
            ref={this.selectedSelectorElement}
            active_selection={this.state.active_selection}
          />
        </div>
      </div>
    );
  }
}

export default Selected;
