import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import getDefaultStyle from './styles';
import { postCigarette } from './actions';

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
  postCigarette: () => {
    dispatch(postCigarette());
  },
});

export function CigaretteForm(props) {
  const classes = useStyles();

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={ classes.appBarSpacer }/>
          <div className={ classes.paper }>
              <Typography component="h1" variant="h5">
                  Add Cigarette
              </Typography>
              { props.cigarettePostFailed && (
                  <p>Adding Cigarette failed</p>
              ) }
              <form className={ classes.form } noValidate onSubmit={ props.postCigarette }>
                  <FormControlLabel
                      control={
                          <Checkbox
                            id="rolled"
                            checked
                            color="primary"
                            value="checked"
                          />
                      }
                      label="rolled"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={ classes.submit }
                    disabled={ props.isSubmitting }
                  >
                    Add
                  </Button>
              </form>
          </div>
      </Container>
  );
}

CigaretteForm.propTypes = {
  cigarettePostFailed: PropTypes.bool,
  postCigarette: PropTypes.func,
  isSubmitting: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CigaretteForm));
