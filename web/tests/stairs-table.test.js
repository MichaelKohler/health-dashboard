/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { StairsTable } from '../src/stairs-table.jsx';

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    stairs: 5,
  }];

  const tree = renderer
    .create(<StairsTable rows={ data }/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
