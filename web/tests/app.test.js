import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/app.jsx';

it('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
