/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { StairsForm } from '../src/stairs-form.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<StairsForm/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders button disabled', () => {
  const tree = renderer
    .create(<StairsForm isSubmitting={true}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
