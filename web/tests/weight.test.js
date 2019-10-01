/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Weight } from '../src/weight.jsx';

jest.mock('../src/weight-chart', () => () => 'WeightChart');

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    weight: 80,
  }];

  const tree = renderer
    .create(<MemoryRouter><Weight weights={ data }/></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
