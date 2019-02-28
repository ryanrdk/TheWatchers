import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import TableDays from './TableDays';
import { GET_ALL_MARKS_FOR_DAY } from '../queries';

class SelectorDays extends React.Component {
  constructor(props) {
    super(props);
    this.tableDaysElement = React.createRef();
    this.state = {
      options: props.days_selection,
      searchQuery: '',
      select: 'None',
      data: [],
      filteredData: []
    };
  }

  componentDidMount() {
    //const jay = require('../selected.json');
    //this.setState({ data: jay, filteredData: jay });
    //this.tableSelectedElement.current.updateStats(jay);
  }

  updateStats(data) {
    this.setState({ data: data, filteredData: data });
    // this.tableSelectedElement.current.updateStats(data);
    // this.tableSelectedElement.current.componentDidMount();
  }

  onChange = (e, data) => {
    // const filt = this.state.data.filter(elem => {
    //     if (data.value === 'All') {
    //         return elem;
    //     } else if (data.value === 'Selected') {
    //         if (elem.active === 'selected') {
    //             return elem;
    //         }
    //     } else if (data.value === 'Not Selected') {
    //         if (elem.active !== 'selected') {
    //             return elem;
    //         }
    //     }
    //     return null;
    // });

    // this.tableSelectedElement.current.updateStats(filt);
    this.setState({
      select: data.value,
      searchQuery: ''
      // filteredData: filt
    });
    if (data.value !== 'None') {
      GET_ALL_MARKS_FOR_DAY(this.tableDaysElement, data.value);
    } else {
      this.tableDaysElement.current.updateStats([]);
    }
  };

  onSearchChange = (e, data) => {
    this.setState({ searchQuery: data.searchQuery });
  };

  render() {
    const { options, searchQuery, select } = this.state;
    return (
      <div>
        <div>
          <Dropdown
            placeholder='None'
            icon='code'
            floating
            labeled
            button
            className='icon'
            selection
            value={select}
            text={searchQuery}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            options={options}
          />
        </div>
        <div style={{ margin: '8px' }} />
        <div>
          <TableDays ref={this.tableDaysElement} />
        </div>
      </div>
    );
  }
}

export default SelectorDays;
