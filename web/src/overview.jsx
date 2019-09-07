import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

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
  fixedHeight: {
    height: 120,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="lg" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 8 } lg={ 9 }>
                      <Paper className={ fixedHeightPaper }>
                          <h1>Hi!</h1>
                      </Paper>
                  </Grid>
              </Grid>
          </Container>
          <Typography variant="body2" color="textSecondary" align="center">
              { `Copyright © ${new Date().getFullYear()} - ` }
              <Link color="inherit" href="https://material-ui.com/">
                  Michael Kohler
              </Link>{ ' ' }
          </Typography>
      </section>
  );
}
