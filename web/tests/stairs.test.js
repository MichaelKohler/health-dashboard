/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Stairs } from '../src/stairs.jsx';

jest.mock('../src/stairs-chart', () => () => 'StairsChart');

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    stairs: 7,
  }];

  const tree = renderer
    .create(<MemoryRouter><Stairs stairs={ data }/></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
