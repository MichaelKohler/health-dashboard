import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHealth, fetchStats } from './actions';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchHealth: () => {
    dispatch(fetchHealth());
  },
  fetchStats: () => {
    dispatch(fetchStats());
  },
});

class DataContainer extends React.Component {
  componentDidMount() {
    this.props.fetchHealth();
    this.props.fetchStats();
  }

  render() {
    return (
        <section>{ this.props.children }</section>
    );
  }
}

DataContainer.propTypes = {
  children: PropTypes.object,
  fetchHealth: PropTypes.func,
  fetchStats: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataContainer);
