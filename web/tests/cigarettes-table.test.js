/* global it, expect, jest */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import { shallow } from 'enzyme';

import CigaretteTable from '../src/cigarette-table.jsx';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    rolled: false,
  }];

  const wrapper = shallow(<CigaretteTable rows={ data }/>);
  expect(shallowToJson(wrapper)).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
