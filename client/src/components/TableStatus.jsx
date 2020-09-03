import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';

/**
 *  For generating tables the new-school way instead of td's and tr's, we used react-table.
 *  You have to define the column headers that is passed as an attribute and read as an array.
 *  You can see like most other tables it imports our Download CSV component that allows you 
 *  to download the content of the table into a .csv file.
 */

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
