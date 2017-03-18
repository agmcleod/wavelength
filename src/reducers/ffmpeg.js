export const DOWNLOADING_COMPLETE = Symbol('DOWNLOADING_COMPLETE');

const INITIAL_STATE = {
  downloading: true
};

export function downloadComplete () {
  return (dispatch) => {
    dispatch({ type: DOWNLOADING_COMPLETE });
  };
}

export default function (state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DOWNLOADING_COMPLETE:
      return Object.assign({}, state, {
        downloading: false
      });
  }

  return state;
}
