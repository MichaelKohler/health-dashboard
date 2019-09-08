import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from './cigarette-table.jsx';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const mapStateToProps = (state) => ({
  cigarettes: state.cigarettes,
  isFetchingHealth: state.isFetchingHealth,
  failedFetchingHealth: state.failedFetchingHealth,
});

export function Cigarettes(props) {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="lg" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      { props.isFetchingHealth && (
                      <Paper className={ classes.paper }>
                          <p>Fetching...</p>
                          <CircularProgress size={ 15 }/>
                      </Paper>
                      ) }
                      { props.cigarettes.length > 0 && (
                      <Table rows={ props.cigarettes }/>
                      ) }
                      { props.failedFetchingHealth && (
                      <Paper className={ classes.paper }>
                          <p>Oh no, something went wrong!</p>
                      </Paper>
                      ) }
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}

Cigarettes.propTypes = {
  cigarettes: PropTypes.array,
  isFetchingHealth: PropTypes.bool,
  failedFetchingHealth: PropTypes.bool,
};

export default connect(
  mapStateToProps,
)(Cigarettes);
