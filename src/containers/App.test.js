import React from 'react';

import { App } from './App';
import { shallow } from 'enzyme';
import styles from './App.css';

describe('App', () => {
  const div = document.createElement('div');
  it('renders without crashing', () => {
    shallow(<App downloading flashMessage={{}} requestConvert={() => {}} />);
  });

  it('file count changes on add', () => {
    const appComponent = shallow(<App downloading={false} flashMessage={{}} requestConvert={() => {}} />, div);
    appComponent.instance().setState({ downloading: false });
    expect(appComponent.find('AddFile').length).toEqual(1);
    appComponent.find(`.${styles.addAnotherFile}`).simulate('click');
    expect(appComponent.find('AddFile').length).toEqual(2);
  });
});
