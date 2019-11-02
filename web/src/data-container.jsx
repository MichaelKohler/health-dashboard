import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHealth } from './actions';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  fetchHealth: () => {
    dispatch(fetchHealth());
  },
});

class DataContainer extends React.Component {
  componentDidMount() {
    this.props.fetchHealth();
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DataContainer);
