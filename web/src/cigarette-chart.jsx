import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const mapStateToProps = (state) => ({
  stats: state.stats,
});

export function CigarettesChart(props) {
  return (
      <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
          <BarChart
            width={ 1100 }
            height={ 300 }
            data={ props.stats.cigarettes }
          >
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="date"/>
              <YAxis/>
              <Tooltip/>
              <Bar dataKey="count" fill="#1f3352"/>
          </BarChart>
      </Grid>
  );
}

CigarettesChart.propTypes = {
  stats: PropTypes.object,
};

export default connect(
  mapStateToProps,
)(CigarettesChart);
