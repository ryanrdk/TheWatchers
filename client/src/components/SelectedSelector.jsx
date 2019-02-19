import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import SelectedStudents from './SelectedStudents';

class SelectedSelector extends React.Component {
  constructor(props) {
    super(props);
    this.tableSelectedElement = React.createRef();
    this.state = {
      options: props.active_selection,
      searchQuery: '',
      select: 'All',
      data: [],
      filteredData: []
    };
  }

  componentDidMount() {
    // const jay = require('../selected.json');
    // this.setState({ data: jay, filteredData: jay });
    // this.tableSelectedElement.current.updateStats(jay);
  }

  updateStats(data) {
    this.setState({ data: data, filteredData: data });
    console.log('Ichi: ', data);
    this.tableSelectedElement.current.updateStats(data);
    this.tableSelectedElement.current.componentDidMount();
  }

  onChange = (e, data) => {
    const filt = this.state.data.filter(elem => {
      if (data.value === 'All') {
        return elem;
      } else if (data.value === 'Selected') {
        console.log('NINI: ' + elem);
        if (elem.selected === 'true') {
          return elem;
        }
      } else if (data.value === 'Not Selected') {
        if (elem.selected === 'false') {
          return elem;
        }
      }
      return null;
    });
    this.tableSelectedElement.current.updateStats(data);
    this.setState({
      select: data.value,
      searchQuery: '',
      filteredData: filt
    });
    this.tableSelectedElement.current.updateStats(filt);
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
          <SelectedStudents ref={this.tableSelectedElement} />
        </div>
      </div>
    );
  }
}

export default SelectedSelector;
