import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();

  function login(event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    // eslint-disable-next-line compat/compat
    fetch('http://localhost:3333/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((rawResponse) => rawResponse.json())
    .then((response) => {
      if (response.token) {
        props.history.push('/');
      }
    })
    .catch((error) => console.error(error));
  }

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={ classes.appBarSpacer }/>
          <div className={ classes.paper }>
              <Avatar className={ classes.avatar }>
                  <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Login
              </Typography>
              <form className={ classes.form } noValidate onSubmit={ login }>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={ classes.submit }
                  >
                    Log in
                  </Button>
              </form>
          </div>
      </Container>
  );
}

Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);
