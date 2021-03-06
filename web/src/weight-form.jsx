import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import getDefaultStyle from './styles';
import { addWeight } from './actions';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function WeightForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSubmitting = useSelector((state) => state.isSubmitting);

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.appBarSpacer}/>
          <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                  Add Weight
              </Typography>
              <form className={classes.form} noValidate onSubmit={() => dispatch(addWeight())}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="weight"
                    label="Weight in kg"
                    name="weight"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={isSubmitting}
                  >
                      Add
                  </Button>
              </form>
          </div>
      </Container>
  );
}
