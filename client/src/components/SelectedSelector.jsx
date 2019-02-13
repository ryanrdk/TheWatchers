import React from 'react';
import SelectedStudents from './SelectedStudents';
import { Dropdown } from 'semantic-ui-react';

class SelectedSelector extends React.Component {
  constructor(props) {
    super(props);
    this.selectStudentTableElement = React.createRef();
    this.state = {
      options: props.active_selection,
      searchQuery: '',
      select: 'All',
      data: [],
      filteredData: []
    };
  }

  componentDidMount() {
    const jay = require('../selected.json');
    this.setState({ data: jay, filteredData: jay });
    this.selectStudentTableElement.current.updateStats(jay);
  }

  onChange = (e, data) => {
    const filt = this.state.data.filter(elem => {
      if (data.value === 'All') {
        return elem;
      } else if (data.value === 'Selected') {
        if (elem.Selected === 'true') {
          return elem;
        }
      } else if (data.value === 'Not Selected') {
        if (elem.Selected === 'false') {
          return elem;
        }
      }
      return null;
    });

    this.setState({
      select: data.value,
      searchQuery: '',
      filteredData: filt
    });
    this.selectStudentTableElement.current.updateStats(filt);
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
            placeholder='Selected'
            search
            selection
            value={select}
            text={searchQuery}
            onChange={this.onChange}
            onSearchChange={this.onSearchChange}
            options={options}
          />
        </div>
        <div>
          <SelectedStudents ref={this.selectStudentTableElement} />
        </div>
      </div>
    );
  }
}

export default SelectedSelector;
