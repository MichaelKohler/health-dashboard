import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Table from './cigarette-table.jsx';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const mapStateToProps = (state) => ({
  cigarettes: state.cigarettes,
});

function Cigarettes(props) {
  const classes = useStyles();

  return (
      <section>
          <div className={ classes.appBarSpacer }/>
          <Container maxWidth="lg" className={ classes.container }>
              <Grid container spacing={ 3 }>
                  <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                      <Table rows={ props.cigarettes }/>
                  </Grid>
              </Grid>
          </Container>
      </section>
  );
}

Cigarettes.propTypes = {
  cigarettes: PropTypes.array,
};

export default connect(
  mapStateToProps,
)(Cigarettes);
