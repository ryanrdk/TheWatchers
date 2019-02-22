import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';
import { Loader } from 'semantic-ui-react';

class TableSelected extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      filtered: [],
      selectAll: false,
      data: [],
      checked: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(
      this
    );
  }

  updateStats(data) {
    this.setState({ filtered: data });
    this.downloadCSVElement.current.updateStats(data);
    let newCheck = [];

    for (let i = 0; i < data.length; ++i) {
      if (data[i].active === 'selected') {
        newCheck[i] = 'checked';
      } else {
        newCheck[i] = '';
      }
    }

    this.setState({
      checked: newCheck
    });
  }

  handleChange = () => {
    let selectAll = !this.state.selectAll;
    this.setState({ selectAll: selectAll });
    let newCheck = [];
    this.state.data.forEach(function(e, index) {
      newCheck.push(selectAll);
    });

    this.setState({
      checked: newCheck
    });
  };

  handleSingleCheckboxChange = index => {
    let newCheck = this.state.checked;
    newCheck[index] = !this.state.checked[index];
    if (newCheck[index] === false) {
      this.setState({ selectAll: false });
    }

    this.setState({
      checked: newCheck
    });
  };

  componentDidMount() {
    //this.setState({ filtered: this.state.data });
    const newData = this.state.filtered;
    let newCheck = [];
    let selectAll = this.state.selectAll;

    newData.forEach(function(e, index) {
      newCheck.push(selectAll);
    });

    for (let i = 0; i < newCheck.length; ++i) {
      if (newData[i]['active'] === 'selected') {
        newCheck[i] = 'checked';
      } else if (newData[i]['active'] !== 'selected') {
        newCheck[i] = '';
      }
    }

    this.setState({
      data: newData, //maybe not necessary
      checked: newCheck,
      selectAll: selectAll
    });
  }

  render() {
    const cols = [
      {
        Header: 'Selected',
        Cell: row => (
          <input
            type='checkbox'
            checked={this.state.checked[row.index]}
            onChange={() => this.handleSingleCheckboxChange(row.index)}
          />
        ),
        sortable: false,
        filterable: false
      },
      {
        Header: 'Username',
        accessor: 'username'
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
        Header: 'Campus',
        accessor: 'campus'
      }
    ];

    return (
      <div>
        <div>
          <ReactTable
            columns={cols}
            data={this.state.filtered}
            filterable
            className={'-highlight'}
            showPagination={false}
            pageSize={this.state.filtered.length}
            noDataText={
              <div>
                <br />
                <br />
                <Loader active inline='centered' />
              </div>
            }
          />
          <div>
            <DownloadCSV ref={this.downloadCSVElement} />
          </div>
        </div>
      </div>
    );
  }
}

export default TableSelected;
