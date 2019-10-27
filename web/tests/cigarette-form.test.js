/* global it, expect */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import renderer from 'react-test-renderer';
import { CigaretteForm } from '../src/cigarette-form.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<CigaretteForm/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders button disabled', () => {
  const tree = renderer
    .create(<CigaretteForm isSubmitting={true}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

/* eslint-enable react/jsx-filename-extension */
