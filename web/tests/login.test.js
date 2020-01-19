/* global it, expect, jest */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { useSelector } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Login from '../src/login.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

it('renders correctly', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      loginFailed: false,
    }),
  );

  const wrapper = shallow(<Login/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders correctly - login failed', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      loginFailed: true,
    }),
  );

  const wrapper = shallow(<Login/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
