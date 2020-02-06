import React from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import getDefaultStyle from './styles';
import { logout } from './actions';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
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
}));

export default function Logout() {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.appBarSpacer}/>
          <div className={classes.paper}>
              <Avatar className={ classes.avatar}>
                  <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                  Logout
              </Typography>
              <form className={classes.form} noValidate onSubmit={() => dispatch(logout())}>
                  <p>Are you sure you want to log out?</p>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                      Log out
                  </Button>
              </form>
          </div>
      </Container>
  );
}
