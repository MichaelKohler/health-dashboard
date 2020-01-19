/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallowToJson  } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import WeightTable from '../src/weight-table.jsx';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    weight: 80,
  }];

  const wrapper = shallow(<WeightTable rows={ data }/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
