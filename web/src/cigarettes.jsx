import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';

import getDefaultStyle from './styles';
import history from './history';
import CigarettesChart from './cigarette-chart.jsx';
import Table from './cigarette-table.jsx';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme)));

export default function Cigarettes() {
  const classes = useStyles();
  const {
    cigarettes,
    isFetchingHealth,
    failedFetchingHealth,
  } = useSelector((state) => state);

  return (
      <section>
          <div className={classes.appBarSpacer}/>
          <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                  <CigarettesChart/>
                  <Grid item xs={12} md={12} lg={12}>
                      {isFetchingHealth && (
                      <Paper className={classes.paper}>
                          <p>Fetching...</p>
                          <CircularProgress size={15}/>
                      </Paper>
                      )}
                      {cigarettes.length > 0 && (
                      <Table rows={cigarettes}/>
                      ) }
                      {failedFetchingHealth && (
                      <Paper className={classes.paper}>
                          <p>Oh no, something went wrong!</p>
                      </Paper>
                      )}
                  </Grid>
              </Grid>
              <Fab aria-label="Add" className={classes.fab} color="primary" onClick={ () => history.push('/cigarettes/add') }>
                  <AddIcon/>
              </Fab>
          </Container>
      </section>
  );
}
