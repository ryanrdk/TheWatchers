import React from 'react';
import ActiveStudents from './ActiveStudents';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className='ui vertical inverted left visible sidebar menu'>
          <a className='item'>
            <i className='home icon' />
            Home
          </a>
          <a className='item'>
            <i className='block layout icon' />
            Active Students
          </a>
          <a className='item'>
            <i className='block layout icon' />
            Mailing List
          </a>
        </div>
        <div className='pusher'>
          <ActiveStudents />
        </div>
      </div>
    );
  }
}

export default Header;
