import React, { Component } from 'react';
import { Divider, Statistic } from 'semantic-ui-react';
import _ from 'lodash';

const colors = ['red', 'yellow', 'green'];

export default class StatisticExampleColoredGroup extends Component {
  state = { color: colors[0] };

  handleColorChange = e => this.setState({ color: e.target.value });

  render() {
    const { color } = this.state;

    return (
      <div>
        <div>
          <select onChange={this.handleColorChange}>
            {_.map(colors, c => (
              <option key={c} value={c}>
                {_.startCase(c)}
              </option>
            ))}
          </select>

          <Divider hidden />

          <Statistic.Group color={color}>
            <Statistic>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Faves</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>31,200</Statistic.Value>
              <Statistic.Label>Views</Statistic.Label>
            </Statistic>
            <Statistic>
              <Statistic.Value>22</Statistic.Value>
              <Statistic.Label>Members</Statistic.Label>
            </Statistic>
          </Statistic.Group>
        </div>
      </div>
    );
  }
}
