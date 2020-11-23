import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import getDefaultStyle from './styles';
import { addCigarette } from './actions';

const useStyles = makeStyles((theme) => Object.assign({}, getDefaultStyle(theme), {
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function CigaretteForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isSubmitting = useSelector((state) => state.isSubmitting);
  const [rolled, setRolled] = useState(true);
  const handleRolledChange = (event) => {
    setRolled(event.target.checked);
  };

  return (
      <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.appBarSpacer}/>
          <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                  Add Cigarette
              </Typography>
              <form className={classes.form} noValidate onSubmit={() => dispatch(addCigarette())}>
                  <FormControlLabel
                      control={
                          <Checkbox
                            id="rolled"
                            checked={rolled}
                            onChange={handleRolledChange}
                            color="primary"
                          />
                      }
                      label="rolled"
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
