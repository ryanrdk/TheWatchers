import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DownloadCSV from './DownloadCSV';
import { Loader } from 'semantic-ui-react';
import { GET_BOOTCAMPER_DAYS, UPDATE_STATUS } from '../queries';

class TableSelected extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      filtered: [],
      filteredSub: [],
      selectAll: false,
      data: [],
      checked: [],
      expanded: {},
      prevRow: null,
      csvStuff: null,
      isSearch: false
    };

    // this.handleChange = this.handleChange.bind(this);
    this.handleSingleCheckboxChange = this.handleSingleCheckboxChange.bind(
      this
    );
  }

  updateStats(data) {
    console.log('Update Stats returns: ' + data[12].active);
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

  updateStats2(data) {
    this.setState({
      filteredSub: data
    });
  }

  // handleChange = () => {
  //   let selectAll = !this.state.selectAll;
  //   this.setState({ selectAll: selectAll });
  //   let newCheck = [];
  //   this.state.data.forEach(function (e, index) {
  //     newCheck.push(selectAll);
  //   });

  //   this.setState({
  //     checked: newCheck
  //   });
  // };

  handleSingleCheckboxChange = index => {
    let newCheck = this.state.checked;
    newCheck[index] = !this.state.checked[index];
    if (newCheck[index] === false) {
      this.setState({ selectAll: false });
      UPDATE_STATUS(this.selectTable.resolvedData[index].username, "active");
    }
    else
      UPDATE_STATUS(this.selectTable.resolvedData[index].username, "selected");
    console.log("docahn", index, newCheck[index], this.selectTable.resolvedData[index].username, this.props);

    this.setState({
      checked: newCheck
    });
  };

  componentDidMount() {
    const newData = this.state.filtered;
    let newCheck = [];
    let selectAll = this.state.selectAll;

    for (let i = 0; i < newData.length; ++i) {
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

  handleFilterChange = (column, value, search) => {
    const currentRecords = this.selectTable.getResolvedState().sortedData;
    console.log('ello');
    this.setState({
      expanded: {},
      filtered: currentRecords,
      isSearch: true
    });
    const oi = currentRecords.filter(async uyu => {
      await this.state.filtered.map(async elem => {
        if (elem.username === uyu.username) {
          return await elem;
        }
      });
      if (this.state.csvStuff !== oi || this.state.csvStuff === null) {
        this.setState({ csvStuff: oi });
        const tocsv = this.state.csvStuff.map(elem => {
          const uu = {
            username: elem.username,
            gender: elem.gender,
            ethnicity: elem.ethnicity,
            campus: elem.campus
          };
          return uu;
        });
        this.downloadCSVElement.current.updateStats(tocsv);
      }
    });
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
        expander: true,
        Header: () => <strong>More</strong>,
        width: 65,
        Expander: ({ isExpanded, ...rest }) => {
          if (rest.original.subTableData) {
            return <div>{isExpanded ? <div>Nope</div> : <div>Yep</div>}</div>;
          } else {
            return null;
          }
        }
      },
      {
        Header: 'Selected',
        Cell: row => (
          // console.log("checkingOut", this.state.checked, row.index),
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
    const colsSub = [
      {
        Header: 'Username',
        accessor: 'Username'
      },
      // {
      //   Header: 'Campus',
      //   accessor: 'Campus'
      // },
      {
        Header: 'Day',
        accessor: 'Day'
      },
      {
        Header: 'Final Mark',
        accessor: 'Final_mark'
      },
      {
        Header: 'Mark 1',
        accessor: 'Mark1'
      },
      {
        Header: 'Comment 1',
        accessor: 'Comment1',
        style: { whiteSpace: 'unset' },
        width: 120
      },
      {
        Header: 'Mark 2',
        accessor: 'Mark2'
      },
      {
        Header: 'Comment 2',
        accessor: 'Comment2',
        style: { whiteSpace: 'unset' },
        width: 120
      },
      {
        Header: 'Mark 3',
        accessor: 'Mark3'
      },
      {
        Header: 'Comment 3',
        accessor: 'Comment3',
        style: { whiteSpace: 'unset' },
        width: 120
      },
      {
        Header: 'Cheating',
        accessor: 'Cheating'
      }
    ];

    return (
      <div>
        <div>
          <ReactTable
            ref={r => {
              this.selectTable = r;
            }}
            columns={cols}
            data={this.props.selData}
            filterable
            defaultFilterMethod={this.filterMethod}
            onFilteredChange={this.handleFilterChange}
            className={'-highlight'}
            showPagination={false}
            pageSize={this.state.filtered.length}
            noDataText={
              <div>
                {this.state.filtered.length === 0 && this.state.isSearch ? (
                  <div>No results found</div>
                ) : (
                    <div>
                      <br /> <br /> <Loader active inline='centered' />
                    </div>
                  )}
              </div>
            }
            expanded={this.state.expanded}
            getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e, handleOriginal) => {
                  if (column.Expander) {
                    GET_BOOTCAMPER_DAYS(this, rowInfo.original.username);
                    // this.expand_row(rowInfo);
                    handleOriginal();
                  }
                }
              };
            }}
            onExpandedChange={(newExpanded, index, event) => {
              // console.log("popo", newExpanded, index)
              if (newExpanded[index[0]] === false) {
                newExpanded = {};
              } else {
                Object.keys(newExpanded).map(k => {
                  return (newExpanded[k] =
                    parseInt(k) === index[0] ? {} : false);
                });
              }
              this.setState({
                ...this.state,
                expanded: newExpanded
              });
            }}
            SubComponent={row => {
              return (
                <div style={{ padding: '20px' }}>
                  <ReactTable
                    columns={colsSub}
                    data={this.state.filteredSub}
                    pageSize={this.state.filteredSub.length}
                    showPagination={false}
                  />
                </div>
              );
            }}
          />
          <div style={{ margin: '8px' }} />
          <div>
            <DownloadCSV ref={this.downloadCSVElement} />
          </div>
        </div>
      </div>
    );
  }
}

export default TableSelected;
