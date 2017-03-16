export const TYPES = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

const INITIAL_STATE = {
  message: '',
  type: ''
};

export const DISPLAY_MESSAGE = Symbol('DISPLAY_MESSAGE');
export const HIDE_MESSAGE = Symbol('HIDE_MESSAGE');

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DISPLAY_MESSAGE:
      return Object.assign({}, state, {
        message: action.payload.message, type: action.payload.type
      });
    case HIDE_MESSAGE:
      return Object.assign({}, state, {
        message: '', type: ''
      });
  }
  return state;
}
