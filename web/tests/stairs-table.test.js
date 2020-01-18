/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallowToJson  } from 'enzyme-to-json';
import { shallow } from 'enzyme';
import StairsTable from '../src/stairs-table.jsx';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    stairs: 5,
  }];

  const wrapper = shallow(<StairsTable rows={ data }/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
