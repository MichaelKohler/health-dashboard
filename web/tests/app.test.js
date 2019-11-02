/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import App from '../src/app.jsx';

jest.mock('../src/sidebar', () => () => 'Sidebar');
jest.mock('../src/snackbar', () => () => 'Snackbar');
jest.mock('../src/cigarette-chart', () => () => 'CigaretteChart');
jest.mock('../src/stairs-chart', () => () => 'StairsChart');
jest.mock('../src/weight-chart', () => () => 'WeightChart');

it('renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter><App/></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
