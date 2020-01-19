/* global it, expect, jest */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Logout from '../src/logout.jsx';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

it('renders correctly', () => {
  const wrapper = shallow(<Logout/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
