/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { useSelector } from 'react-redux';
import { shallowToJson  } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Cigarettes from '../src/cigarettes.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

it('renders correctly', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      cigarettes: [{
        createdAt: '2019-08-07T08:00:03Z',
        rolled: false,
      }],
      isFetchingHealth: false,
      failedFetchingHealth: false,
    }),
  );

  const wrapper = shallow(<Cigarettes />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders correctly - fetching', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      cigarettes: [],
      isFetchingHealth: true,
      failedFetchingHealth: false,
    }),
  );

  const wrapper = shallow(<Cigarettes />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders correctly - fetch error', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      cigarettes: [],
      isFetchingHealth: false,
      failedFetchingHealth: true,
    }),
  );

  const wrapper = shallow(<Cigarettes />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
