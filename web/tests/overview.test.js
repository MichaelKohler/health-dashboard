/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import Overview from '../src/overview.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Overview/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
