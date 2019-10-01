/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Overview from '../src/overview.jsx';

jest.mock('../src/cigarette-chart', () => () => 'CigaretteChart');
jest.mock('../src/weight-chart', () => () => 'WeightChart');

it('renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><Overview/></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
