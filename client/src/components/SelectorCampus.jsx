import React from 'react';
import TableStats from './TableStats';
import { Dropdown } from 'semantic-ui-react';

/**
 * SelectorCampus SELECTOR ~~~ Select either JHB or CPT or both
 * State -> options, selected, demoData, filteredData, demoCount
 * Ref -> tableStatsElement
 * Child Components -> TableStats ~~ Displays demographics data on a table
 *                          - DownloadCSV ~~ Download the data
 */

 /**
  * Here is our component that contains most of our logic for our filters that
  * we can apply to our tables, it counts the campuses by demographic to display.
  */
class SelectorCampus extends React.Component {
  constructor(props) {
    super(props);
    this.tableStatsElement = React.createRef();
    this.state = {
      options: props.campus_selection,
      searchQuery: '',
      selected: 'ALL',
      demoData: [],
      filteredData: [],
      demoCount: props.demoCount
    };
  }

  componentDidMount() {
  }

  updateStats(data) {
    this.setState({ demoData: data, filtered: data });
    this.tableStatsElement.current.updateStats([
      data.capetown.male,
      data.capetown.female,
      data.johannesburg.male,
      data.johannesburg.female
    ]);
  }

  /**
   * updateDemoCount updates the demographic stats per campus and gender
   * @param {*} campus -> Required! String. Specify between "capetown" and "johannesburg"
   * @param {*} gender -> Required! String. Specify between "male" and "female"
   * @param {*} wht -> Required! Int. Value for race "white"
   * @param {*} blk -> Required! Int. Value for race "black"
   * @param {*} col -> Required! Int. Value for race "coloured"
   * @param {*} ind -> Required! Int. Value for race "indian"
   * @param {*} chi -> Required! Int. Value for race "chinese"
   */
  updateDemoCount(campus, gender, wht, blk, col, ind, chi) {
    if (campus === 'capetown') {
      if (gender === 'male') {
        this.setState({
          demoCount: {
            ...this.state.demoCount,
            capetown: {
              ...this.state.demoCount.capetown,
              male: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'CPT Male'
              }
            }
          }
        });

        this.tableStatsElement.current.setState({
          demoCount: {
            ...this.tableStatsElement.current.state.demoCount,
            capetown: {
              ...this.tableStatsElement.current.state.demoCount.capetown,
              male: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'CPT Male'
              }
            }
          }
        });
      }
      if (gender === 'female') {
        this.setState({
          demoCount: {
            ...this.state.demoCount,
            capetown: {
              ...this.state.demoCount.capetown,
              female: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'CPT Female'
              }
            }
          }
        });
        this.tableStatsElement.current.setState({
          demoCount: {
            ...this.tableStatsElement.current.state.demoCount,
            capetown: {
              ...this.tableStatsElement.current.state.demoCount.capetown,
              female: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'CPT Female'
              }
            }
          }
        });
      }
    }
    if (campus === 'johannesburg') {
      if (gender === 'male') {
        this.setState({
          demoCount: {
            ...this.state.demoCount,
            johannesburg: {
              ...this.state.demoCount.johannesburg,
              male: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'JHB Male'
              }
            }
          }
        });
        this.tableStatsElement.current.setState({
          demoCount: {
            ...this.tableStatsElement.current.state.demoCount,
            johannesburg: {
              ...this.tableStatsElement.current.state.demoCount.johannesburg,
              male: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'JHB Male'
              }
            }
          }
        });
      }
      if (gender === 'female') {
        this.setState({
          demoCount: {
            ...this.state.demoCount,
            johannesburg: {
              ...this.state.demoCount.johannesburg,
              female: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'JHB Female'
              }
            }
          }
        });
        this.tableStatsElement.current.setState({
          demoCount: {
            ...this.tableStatsElement.current.state.demoCount,
            johannesburg: {
              ...this.tableStatsElement.current.state.demoCount.johannesburg,
              female: {
                white: wht,
                black: blk,
                coloured: col,
                indian: ind,
                chinese: chi,
                dem: 'JHB Female'
              }
            }
          }
        });
      }
    }
  }
  onChange = (e, data) => {
    let filt = [];
    if (data.value === 'ALL') {
      filt = [
        data.democount.capetown.male,
        data.democount.capetown.female,
        data.democount.johannesburg.male,
        data.democount.johannesburg.female
      ];
    }
    if (data.value === 'CPT') {
      filt = [data.democount.capetown.male, data.democount.capetown.female];
    }
    if (data.value === 'JHB') {
      filt = [
        data.democount.johannesburg.male,
        data.democount.johannesburg.female
      ];
    }
    console.log('filtering', filt, this.state.demoCount);
    this.setState({
      selected: data.value,
      searchQuery: '',
      filteredData: filt
    });
    this.tableStatsElement.current.updateStats(filt);
  };
  onSearchChange = (e, data) => {
    this.setState({ searchQuery: data.searchQuery });
  };
  render() {
    const { options, searchQuery, selected, demoCount } = this.state;
    return (
      <div>
        <div>
          <Dropdown
            placeholder='Campus'
            icon='university'
            floating
            labeled
            button
            className='icon'
            selection
            value={selected}
            text={searchQuery}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            options={options}
            democount={demoCount}
          />
        </div>
        <div style={{ margin: '8px' }} />
        <div>
          <TableStats
            ref={this.tableStatsElement}
            demoCount={this.state.demoCount}
          />
        </div>
      </div>
    );
  }
}

export default SelectorCampus;
