/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import Title from '../src/title.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Title>Hi!</Title>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
