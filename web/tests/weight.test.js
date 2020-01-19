/* global it, expect, jest */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { useSelector } from 'react-redux';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Weight from '../src/weight.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

it('renders correctly', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      weights: [{
        createdAt: '2019-08-07T08:00:03Z',
        weight: 80,
      }],
      isFetchingHealth: false,
      failedFetchingHealth: false,
    }),
  );

  const wrapper = shallow(<Weight/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders correctly - fetching', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      weights: [],
      isFetchingHealth: true,
      failedFetchingHealth: false,
    }),
  );

  const wrapper = shallow(<Weight/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders correctly - fetching error', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      weights: [],
      isFetchingHealth: false,
      failedFetchingHealth: true,
    }),
  );

  const wrapper = shallow(<Weight/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
