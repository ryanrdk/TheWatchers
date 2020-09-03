import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import TableDays from './TableDays';
import { GET_ALL_MARKS_FOR_DAY } from '../queries';

/**
 * This selector class controls our filters for the student evaluations (marking) table.
 */

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
  }

  updateStats(data) {
    this.setState({ data: data, filteredData: data });
  }

  onChange = (e, data) => {
    this.setState({
      select: data.value,
      searchQuery: ''
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
