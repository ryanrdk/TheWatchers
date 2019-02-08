import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import './components/styles.css';
import Header_demo from './components/Header_demo';

const App = () => {
  return (
    <div
      className='full-screen'
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      <BrowserRouter>
        {/* <Header /> */}
        <div className='full-screen'>
          <Route path='/' exact component={LandingPage} />
          <Route path='/watcher' exact component={Header} />
          <Route path='/demographs' exact component={Header_demo} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
