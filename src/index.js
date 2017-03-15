import React from 'react';
import ReactDOM from 'react-dom';

const electron = require('electron');

import { createStore } from 'redux';
import { flashMessageReducer } from './reducers/flash_message';

import App from './containers/App';
import './index.css';

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
  <App />,
  document.getElementById('root')
);
