import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import './components/styles.css';

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
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
