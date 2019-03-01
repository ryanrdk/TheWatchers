import React from 'react';
import TableMailingList from './TableMailingList';
import Header from './Header';
import { GET_ALL_BOOTCAMPERS } from '../queries';
import ActiveStudent from '../containers/activeStudent';

class ViewMailingList extends React.Component {
  constructor(props) {
    super(props);
    this.mailingListTableElement = React.createRef();
    this.downloadCSVElement = React.createRef();
    this.state = {
      data: [],
      filtered: []
    };
  }

  componentDidMount() {
    let mailingNode = document.getElementById('mail').lastChild;
    document.getElementById('curr-view').appendChild(mailingNode);
    // GET_ALL_BOOTCAMPERS(this.mailingListTableElement);
  }

  render() {
    return (
      <div>
        <ActiveStudent compRef={this.mailingListTableElement} />
        <Header />
        <div id='mail' style={{ clear: 'both', float: 'left' }}>
          <TableMailingList
            ref={this.mailingListTableElement}
            filtered={this.state.filtered}
          />
        </div>
      </div>
    );
  }
}

export default ViewMailingList;
