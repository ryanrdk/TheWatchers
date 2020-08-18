import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

class TableStatus extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      filtered: []
    };
  }

  updateStats(data) {
    this.setState({ filtered: data });
    this.downloadCSVElement.current.updateStats(data);
  }

  render() {
    const cols = [
      {
        Header: 'First Name',
        accessor: 'first_name'
      },
      {
        Header: 'Last Name',
        accessor: 'last_name'
      },
      {
        Header: 'Username',
        accessor: 'username'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Campus',
        accessor: 'campus'
      },
      {
        Header: 'Gender',
        accessor: 'gender'
      },
      {
        Header: 'Ethnicity',
        accessor: 'ethnicity'
      },
      {
        Header: 'Active',
        accessor: 'active'
      }
    ];
    return (
      <div>
        <div>
          <ReactTable
            columns={cols}
            data={this.state.filtered}
            className={'-highlight'}
            expanded={{
              1: true,
              4: true
            }}
            pageSize={this.state.filtered.length ? this.state.filtered.length : 10 }
            showPagination={this.state.filtered.length > 10 ? true: false }
            // pageSize={this.state.filtered.length}
          />
        </div>
        <div style={{ margin: '8px' }} />
        <div>
          <DownloadCSV ref={this.downloadCSVElement} />
        </div>
      </div>
    );
  }
}

export default TableStatus;
