export const CONVERT_REQUESTED = Symbol('CONVERT_REQUESTED');
export const CONVERT_COMPLETE = Symbol('CONVERT_COMPLETE');

const electron = require('electron');

const INITIAL_STATE = {
  submitted: false,
  completed: false
};

export function requestConvert (formats, files) {
  return (dispatch) => {
    dispatch({ type: CONVERT_REQUESTED });
    electron.ipcRenderer.send('convert-files', {
      files, formats
    });
  };
}

export function finishConvert () {
  return (dispatch) => {
    dispatch({ type: CONVERT_COMPLETE });
  };
}

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CONVERT_COMPLETE:
      return Object.assign({}, state, { completed: true, submitted: false });
    case CONVERT_REQUESTED:
      return Object.assign({}, state, { completed: false, submitted: true });
  }

  return state;
}
