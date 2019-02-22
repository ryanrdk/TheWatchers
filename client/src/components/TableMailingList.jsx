import React from 'react';
import ReactTable from 'react-table';
import DownloadCSV from './DownloadCSV';

class TableMailingList extends React.Component {
  constructor(props) {
    super(props);
    this.reactTable = React.createRef();
    this.downloadCSVElement = React.createRef();
    this.state = {
      data: [],
      filtered: []
    };
  }

  updateStats(data) {
    this.setState({ data: data, filtered: data });
    this.downloadCSVElement.current.updateStats(data);
    console.log('compo', this.state.filtered);
  }

  updateChange(data) {
    this.setState({ filtered: data });
    this.downloadCSVElement.current.updateStats(data);
    console.log('compoChange', data);
  }

  onTableViewChange = async () => {
    await this.updateChange(this.state.data);
    const current = this.reactTable.current;
    if (current) {
      const page = current.state.page;
      const pageSize = current.state.pageSize;
      const allData = current.getResolvedState().sortedData;
      const startIdx = page * pageSize;
      const currentData = allData
        .slice(startIdx, startIdx + pageSize * current.state.pages)
        .map(item => item._original);
      this.updateChange(currentData);
    }
  };

  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };

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
            ref={this.reactTable}
            columns={cols}
            data={this.state.filtered}
            filterable
            defaultFilterMethod={this.filterMethod}
            onChange={this.onChange}
            className={'-highlight'}
            expanded={{
              1: true,
              4: true
            }}
            onFilteredChange={this.onTableViewChange}
          />
          <DownloadCSV ref={this.downloadCSVElement} />
        </div>
      </div>
    );
  }
}

export default TableMailingList;
