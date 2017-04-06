import React from 'react';

import Formats from './index';
import { shallow } from 'enzyme';

describe('Formats', () => {
  it('renders without crashing', () => {
    const fn = () => {};
    const component = shallow(<Formats onToggleFormat={fn} />);
    expect(component.find('input#mp3').length).toBe(1);
  });
});
