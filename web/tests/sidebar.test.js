/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mainListItems } from '../src/sidebar.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<MemoryRouter>{ mainListItems }</MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
