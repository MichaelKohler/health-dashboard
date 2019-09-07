import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Table from './table.jsx';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Cigarettes() {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="lg" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      <Table/>
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}
