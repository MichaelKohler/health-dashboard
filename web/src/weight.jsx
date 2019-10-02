import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

import getDefaultStyle from './styles';
import history from './history';
import Table from './weight-table.jsx';
import WeightChart from './weight-chart.jsx';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme)));

const mapStateToProps = (state) => ({
  weights: state.weights,
  isFetchingHealth: state.isFetchingHealth,
  failedFetchingHealth: state.failedFetchingHealth,
});

export function Weight(props) {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="lg" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <WeightChart/>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      { props.isFetchingHealth && (
                      <Paper className={ classes.paper }>
                          <p>Fetching...</p>
                          <CircularProgress size={ 15 }/>
                      </Paper>
                      ) }
                      { props.weights.length > 0 && (
                      <Table rows={ props.weights }/>
                      ) }
                      { props.failedFetchingHealth && (
                      <Paper className={ classes.paper }>
                          <p>Oh no, something went wrong!</p>
                      </Paper>
                      ) }
                  </Grid>
              </Grid>
              <Fab aria-label="Add" className={ classes.fab } color="primary" onClick={ () => history.push('/weight/add') }>
                  <AddIcon/>
              </Fab>
          </Container>
      </section>
  );
}

Weight.propTypes = {
  weights: PropTypes.array,
  isFetchingHealth: PropTypes.bool,
  failedFetchingHealth: PropTypes.bool,
};

export default connect(
  mapStateToProps,
)(Weight);
