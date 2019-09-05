import React from 'react';
import renderer from 'react-test-renderer';
import Overview from '../src/overview.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<Overview/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
