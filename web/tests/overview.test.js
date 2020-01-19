/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallowToJson  } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Overview from '../src/overview.jsx';

it('renders correctly', () => {
  const wrapper = shallow(<Overview/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
