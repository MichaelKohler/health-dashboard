/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { useSelector } from 'react-redux';
import { shallowToJson  } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import WeightForm from '../src/weight-form.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

it('renders correctly', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      isSubmitting: false,
    }),
  );

  const wrapper = shallow(<WeightForm />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('renders button disabled', () => {
  useSelector.mockImplementation(
    (selectorFn) => selectorFn({
      isSubmitting: true,
    }),
  );

  const wrapper = shallow(<WeightForm />);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
