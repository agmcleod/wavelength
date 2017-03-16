import React from 'react';
import ReactDOM from 'react-dom';

const electron = require('electron');

import { createStore, combineReducers} from 'redux';
import { flashMessageReducer } from './reducers/flash_message';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './containers/App';
import './index.css';

const store = createStore(
  combineReducers({ flashMessageReducer }), {}, thunk
);

electron.ipcRenderer.on('downloaded', (event, message) => {
  if (message) {
    // dispatch downloading finished
  }
});

electron.ipcRenderer.on('save-error', (event, message) => {
  // dispatch error message
});

electron.ipcRenderer.on('save-succeeded', (event, message) => {
  // dispatch success message
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
