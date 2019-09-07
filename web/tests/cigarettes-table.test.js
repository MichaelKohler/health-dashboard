/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CigarettesTable from '../src/cigarette-table.jsx';

it('renders correctly', () => {
  const data = [{
    createdAt: '2019-08-07T08:00:03Z',
    rolled: false,
  }];

  const tree = renderer
    .create(<CigarettesTable rows={ data }/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
