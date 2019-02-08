import React from 'react';
import { Link } from 'react-router-dom';
import ActiveStudents from './ActiveStudents';
import Demographics from './Demographics';

class Header_demo extends React.Component {
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
                <Link to='/watcher' className='item'>
                <i className='block layout icon' />
                Mailing List
                </Link>
            </div>
            <div className='pusher'>
                <Demographics />
            </div>
            </div>
        );
    }
}

export default Header_demo;
