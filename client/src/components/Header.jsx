import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className='ui vertical inverted left visible sidebar menu'>
          <Link to='/demographs' className='item'>
            <i className='home icon' />
            Home
          </Link>
          <Link to='/watcher' className='item'>
            <i className='block layout icon' />
            Active Students
          </Link>
          <Link to='/mailinglist' className='item'>
            <i className='block layout icon' />
            Mailing List
          </Link>
        </div>
        <div id='curr-view' className='pusher' />
      </div>
    );
  }
}

export default Header;
