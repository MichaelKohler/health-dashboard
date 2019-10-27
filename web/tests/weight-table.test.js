/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { WeightTable } from '../src/weight-table.jsx';

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    weight: 80,
  }];

  const tree = renderer
    .create(<WeightTable rows={ data }/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
