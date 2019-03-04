import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from '../containers/GoogleAuth';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className='ui vertical inverted left visible blue sidebar menu'>
          <Link to='/demographs' className='item'>
            <i className='home icon' />
            Home
          </Link>
          <Link to='/watcher' className='item'>
            <i className='tasks icon' />
            Active Students
          </Link>
          <Link to='/mailinglist' className='item'>
            <i className='paper plane icon' />
            Mailing List
          </Link>
          <div className='ui inverted blue bottom fixed menu'>
            <div
              style={{
                width: '100%',
                margin: '6px'
              }}>
              <GoogleAuth />
            </div>
          </div>
        </div>
        <div id='curr-view' className='pusher' />
      </div>
    );
  }
}

export default Header;
