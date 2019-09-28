/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Logout } from '../src/logout.jsx';

it('renders correctly', () => {
  const logout = () => {};
  const tree = renderer
    .create(<MemoryRouter><Logout logout={logout}/></MemoryRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
