import flashMessageReducer, * as actions from './flash_message';

describe('reducers - flashMessage', () => {
  const INITIAL_STATE = {
    message: ''
  };

  it('should have the proper initial state', () => {
    expect(flashMessageReducer()).toEqual(INITIAL_STATE)
  });
});
