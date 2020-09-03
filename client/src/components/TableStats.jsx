import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import InsertEntry from './InsertEntry';
import DeleteEntry from './DeleteEntry';
import DownloadCSV from './DownloadCSV';

/**
 * TableStats TABLE ~~~ Displays table of demographics
 * State -> filtered, demoCount
 * Ref -> downloadCSVElement
 * Child components -> DownloadCSV ~~ Download the data
 */

 /**
  * This component creates our table for the stats on our home page.
  * It also holds our Insert and Delete components.
  */
class TableStats extends React.Component {
  constructor(props) {
    super(props);
    this.downloadCSVElement = React.createRef();
    this.state = {
      filtered: props.demoCount,
      demoCount: props.demoCount
    };
  }

  componentDidMount() {
    this.setState({ filtered: this.state.demoCount });
  }
  updateStats(data) {
    this.setState({ filtered: data });
    this.downloadCSVElement.current.updateStats(data);
  }
  render() {
    const cols = [
      {
        Header: 'Demographs',
        accessor: 'dem'
      },
      {
        Header: 'Black',
        accessor: 'black'
      },
      {
        Header: 'White',
        accessor: 'white'
      },
      {
        Header: 'Coloured',
        accessor: 'coloured'
      },
      {
        Header: 'Indian',
        accessor: 'indian'
      },
      {
        Header: 'Chinese',
        accessor: 'chinese'
      }
    ];

    let oh = this.state.filtered;
    if (oh.constructor === Object) {
      oh = [
        this.state.demoCount.capetown.male,
        this.state.demoCount.capetown.female,
        this.state.demoCount.johannesburg.male,
        this.state.demoCount.johannesburg.female
      ];
    }
    
    return (
      <div>
        <div>
          <ReactTable
            columns={cols}
            data={oh}
            className={'-highlight'}
            expanded={{
              1: true,
              4: true
            }}
            showPagination={false}
            pageSize={this.state.filtered.length}
          />
        </div>
        <div style={{ margin: '8px' }} />
        <div>
          <InsertEntry {...this.props}/>
          <DeleteEntry {...this.props} />
          <DownloadCSV ref={this.downloadCSVElement} />
        </div>
        <br />
        <br />
        <div id='divider' className='ui inverted divider' />
      </div>
    );
  }
}

export default TableStats;
