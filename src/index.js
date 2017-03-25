import React from 'react';
import ReactDOM from 'react-dom';

const electron = require('electron');

import { applyMiddleware, createStore, combineReducers} from 'redux';
import flashMessageReducer, * as flashActions from './reducers/flash_message';
import ffmpegReducer, * as ffmpegActions from './reducers/ffmpeg';
import convertReducer, * as convertActions from './reducers/convert';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import App from './containers/App';
import './index.css';

const store = createStore(
  combineReducers({
    convertReducer,
    flashMessageReducer,
    ffmpegReducer
  }), applyMiddleware(thunk)
);

electron.ipcRenderer.on('downloaded', (event, message) => {
  if (message) {
    store.dispatch(ffmpegActions.downloadComplete());
  }
});

electron.ipcRenderer.on('save-error', (event, message) => {
  store.dispatch(convertActions.finishConvert());
  store.dispatch(flashActions.displayMessage(flashActions.TYPES.ERROR, message));
});

electron.ipcRenderer.on('save-succeeded', (event, message) => {
  store.dispatch(convertActions.finishConvert());
  store.dispatch(flashActions.displayMessage(flashActions.TYPES.SUCCESS, message));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
