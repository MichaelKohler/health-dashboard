import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { clearSnackbar } from './actions';

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: theme.palette.primary.success,
    display: 'flex',
    alignItems: 'center',
  },
  error: {
    backgroundColor: theme.palette.primary.error,
    display: 'flex',
    alignItems: 'center',
  },
}));


export default function AppSnackbar() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const {
    snackbarMessage,
    snackbarOpen,
    snackbarType,
  } = useSelector((state) => state);

  function handleClose() {
    dispatch(clearSnackbar());
  }

  console.log('snackbarType', snackbarType); // eslint-disable-line no-console

  return (
      <Snackbar
          anchorOrigin={ {
            vertical: 'top',
            horizontal: 'center',
          } }
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'client-snackbar',
            className: classes[snackbarType],
          }}
          message={
              <span id="client-snackbar">
                  {snackbarMessage}
              </span>
          }
          action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                  <CloseIcon/>
              </IconButton>,
          ]}
      />
  );
}
