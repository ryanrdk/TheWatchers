import React from 'react';
import SelectorSelected from './SelectorSelected';
import Header from './Header';

class Selected extends React.Component {
  constructor(props) {
    super(props);

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
  }
  render() {
    return (
      <div>
        <Header />
        <div id='student' style={{ clear: 'both', float: 'left' }}>
          <SelectorSelected active_selection={this.state.active_selection} />
        </div>
      </div>
    );
  }
}

export default Selected;
