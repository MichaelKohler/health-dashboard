/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Title from '../src/title.jsx';

it('renders correctly', () => {
  const wrapper = shallow(<Title>Hi!</Title>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
