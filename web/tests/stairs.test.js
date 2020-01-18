/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { useSelector } from 'react-redux';
import { shallowToJson  } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import Stairs from '../src/stairs.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

it('renders correctly', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      stairs: [{
        createdAt: '2019-08-07T08:00:03Z',
        stairs: 7,
      }],
      isFetchingHealth: false,
      failedFetchingHealth: false,
    }),
  );

  const wrapper = shallow(<Stairs />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('shows fetching paper', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      stairs: [],
      isFetchingHealth: true,
      failedFetchingHealth: false,
    }),
  );

  const wrapper = shallow(<Stairs />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
