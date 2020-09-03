import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';

import App from './App';
import reducers from './reducers';

/**
 *  This is the high level of what we would still consider being in the React environment,
 *  before we get to pure HTML.
 *  It is at this level that we create our Redux store and implement the middleware, which
 *  allows us to send our actions to the store reducers asynchronously.
 *  We pass the instantiated store as an attribute to a provider that wraps around our entire app.
 *  This allows us to connect and send and receive states in the components residing within the app.
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(promiseMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
