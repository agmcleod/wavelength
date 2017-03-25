import reducer, * as actions from './convert';

const INITIAL_STATE = {
  submitted: false,
  completed: false
};

describe('reducers - convert', () => {
  describe('INITIAL_STATE', () => {
    it('reducer should return default state', () => {
      expect(reducer()).toEqual(INITIAL_STATE);
    });
  });

  describe('CONVERT_COMPLETE', () => {
    it('reducer should return correct values', () => {
      const state = reducer(null, { type: actions.CONVERT_COMPLETE });
      expect(state).toEqual({ completed: true, submitted: false });
    });
  });

  describe('CONVERT_REQUESTED', () => {
    it('reducer should return correct values', () => {
      const state = reducer(null, { type: actions.CONVERT_REQUESTED });
      expect(state).toEqual({ completed: false, submitted: true });
    });
  });
});
