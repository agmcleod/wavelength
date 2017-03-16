import flashMessageReducer, * as actions from './flash_message';

describe('reducers - flashMessage', () => {
  const INITIAL_STATE = {
    message: '',
    type: ''
  };

  it('should have the proper initial state', () => {
    expect(flashMessageReducer()).toEqual(INITIAL_STATE);
  });

  describe('DISPLAY_MESSAGE', () => {
    it('should set the message', () => {
      const result = flashMessageReducer(INITIAL_STATE, {
        payload: { type: actions.TYPES.SUCCESS, message: 'hi!' },
        type: actions.DISPLAY_MESSAGE
      });

      expect(result.message).toEqual('hi!');
      expect(result.type).toEqual(actions.TYPES.SUCCESS);
    });
  });

  describe('HIDE_MESSAGE', () => {
    it('should unset the message', () => {
      const result = flashMessageReducer({ message: 'abc', type: 'no' }, {
        type: actions.HIDE_MESSAGE
      });

      expect(result.message).toEqual('');
      expect(result.type).toEqual('');
    });
  });
});
