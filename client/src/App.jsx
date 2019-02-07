import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';

const App = () => {
  return (
    <div
      class='ui container'
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexWrap: 'wrap'
      }}>
      <BrowserRouter>
        {/* <Header /> */}
        <div class='ui middle aligned grid'>
          <Route path='/' exact component={LandingPage} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
