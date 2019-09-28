/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { WeightForm } from '../src/weight-form.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<WeightForm/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
