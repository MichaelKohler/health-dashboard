import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import getDefaultStyle from './styles';
import { addStairs } from './actions';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addStairs: () => {
    dispatch(addStairs());
  },
});

export function StairsForm(props) {
  const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.appBarSpacer}/>
          <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                  Add Stairs
              </Typography>
              <form className={classes.form} noValidate onSubmit={props.addStairs}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="stairs"
                    label="Stairs"
                    name="stairs"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={props.isSubmitting}
                  >
                    Add
                  </Button>
              </form>
          </div>
      </Container>
  );
}

StairsForm.propTypes = {
  addStairs: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(StairsForm));
