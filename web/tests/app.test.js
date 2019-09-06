/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/app.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
