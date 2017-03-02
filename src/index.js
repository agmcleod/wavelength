import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { flashMessageReducer } from './reducers/flash_message'

import App from './containers/App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
