import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import getDefaultStyle from './styles';

import CigarettesChart from './cigarette-chart.jsx';
import WeightChart from './weight-chart.jsx';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  fixedHeight: {
    height: 120,
  },
}));

export default function Overview() {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="lg" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      <h1>Cigarettes</h1>
                      <CigarettesChart/>

                      <h1>Weight</h1>
                      <WeightChart/>
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}
