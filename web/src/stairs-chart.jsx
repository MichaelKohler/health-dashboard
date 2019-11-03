import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const mapStateToProps = (state) => ({
  stats: state.stats,
  statsFailed: state.statsFailed,
});

export function StairsChart(props) {
  return (
      <Grid item xs={12} md={12} lg={12}>
          {props.statsFailed && (
              <p>Oh no, something went wrong while fetching the stats!</p>
          )}
          {props.stats.stairs && (
              <BarChart
                width={1100}
                height={300}
                data={props.stats.stairs}
              >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="count" fill="#1f3352"/>
              </BarChart>
          )}
      </Grid>
  );
}

StairsChart.propTypes = {
  stats: PropTypes.object,
  statsFailed: PropTypes.bool,
};

export default connect(
  mapStateToProps,
)(StairsChart);
