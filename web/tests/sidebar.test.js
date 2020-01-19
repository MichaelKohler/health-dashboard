/* global it, expect, jest */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { useSelector } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Sidebar from '../src/sidebar.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

it('renders correctly - logged out', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      isLoggedIn: false,
    }),
  );

  const wrapper = shallow(<Sidebar/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders correctly - logged in', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      isLoggedIn: true,
    }),
  );

  const wrapper = shallow(<Sidebar/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
