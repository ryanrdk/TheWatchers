import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import TableSelected from './TableSelected';

class SelectorSelected extends React.Component {
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
    //const jay = require('../selected.json');
    //this.setState({ data: jay, filteredData: jay });
    //this.tableSelectedElement.current.updateStats(jay);
  }

  updateStats(data) {
    this.setState({ data: data, filteredData: data });
    this.tableSelectedElement.current.updateStats(data);
    this.tableSelectedElement.current.componentDidMount();
  }

  onChange = (e, data) => {
    const filt = this.state.data.filter(elem => {
      if (data.value === 'All') {
        return elem;
      } else if (data.value === 'Selected') {
        if (elem.active === 'selected') {
          return elem;
        }
      } else if (data.value === 'Not Selected') {
        if (elem.active !== 'selected') {
          return elem;
        }
      }
      return null;
    });

    this.tableSelectedElement.current.updateStats(filt);
    this.setState({
      select: data.value,
      searchQuery: '',
      filteredData: filt
    });
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
            placeholder='All Students'
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
        <div>
          <TableSelected ref={this.tableSelectedElement} />
        </div>
      </div>
    );
  }
}

export default SelectorSelected;
