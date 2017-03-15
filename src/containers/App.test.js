import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { shallow } from 'enzyme';

describe('App', () => {
  const div = document.createElement('div');
  it('renders without crashing', () => {
    ReactDOM.render(<App />, div);
  });

  it('file count changes on add', () => {
    const appComponent = shallow(<App />, div);
    expect(appComponent.find('AddFile').length).toEqual(1);
    appComponent.find('button').simulate('click');
    expect(appComponent.find('AddFile').length).toEqual(2);
  });
});
