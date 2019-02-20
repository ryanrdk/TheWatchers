import React from 'react';
import { Router, Route } from 'react-router-dom';
import './components/styles.css';
import ViewLogin from './components/ViewLogin';
import ViewDemographics from './components/ViewDemographics';
import ViewSelected from './components/ViewSelected';
import TableMailingList from './components/TableMailingList';
import history from './history';

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
      <Router history={history}>
        <div className='full-screen'>
          <Route path='/' exact component={ViewLogin} />
          <Route path='/demographs' exact component={ViewDemographics} />
          <Route path='/watcher' exact component={ViewSelected} />
          <Route path='/mailinglist' exact component={TableMailingList} />
        </div>
      </Router>
    </div>
  );
};

export default App;
