import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchHealth } from './actions';

export default function DataContainer(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHealth());

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        dispatch(fetchHealth());
      }
    });
  });

  return (
      <section>{props.children}</section>
  );
}

DataContainer.propTypes = {
  children: PropTypes.object,
};
