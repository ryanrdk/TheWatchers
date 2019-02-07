import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Header />
          <Route path='/' exact component={LandingPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
