import reducer, * as actions from './ffmpeg';

const INITIAL_STATE = {
  downloading: true
};

describe('reduces - ffmpeg', () => {
  it('should equal default state', () => {
    expect(reducer()).toEqual(INITIAL_STATE);
  });

  describe('DOWNLOADING_COMPLETE', () => {
    it('should set downloading to true', () => {
      expect(reducer(undefined, { type: actions.DOWNLOADING_COMPLETE }).downloading).toEqual(false);
    });
  });

  describe('downloadComplete', () => {
    it('should dispatch with the correct type', () => {
      const fn = jest.fn();
      actions.downloadComplete()(fn);
      expect(fn.mock.calls.length).toBe(1);
      expect(fn.mock.calls[0][0]).toEqual({ type: actions.DOWNLOADING_COMPLETE });
    });
  });
});
