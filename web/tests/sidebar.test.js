/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { mainListItems } from '../src/sidebar.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<div>{ mainListItems }</div>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
