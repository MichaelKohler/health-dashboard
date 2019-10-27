import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { deleteStairs } from './actions';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  deleteStairs: (id) => {
    dispatch(deleteStairs(id));
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export function StairsTable(props) {
  const classes = useStyles();

  return (
      <Paper className={ classes.root }>
          <Table className={ classes.table } size="small">
              <TableHead>
                  <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="right">Stairs</TableCell>
                      <TableCell align="right">Actions</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  { props.rows.map((row) => (
                      <TableRow key={ row.createdAt }>
                          <TableCell align="left">{ row.createdAt }</TableCell>
                          <TableCell align="right">{ row.stairs }</TableCell>
                          <TableCell align="right">
                              <Button color="secondary" className={ classes.button }
                                      onClick={ () => props.deleteStairs(row.id) }>
                                Delete
                              </Button>
                          </TableCell>
                      </TableRow>
                  )) }
              </TableBody>
          </Table>
      </Paper>
  );
}

StairsTable.propTypes = {
  rows: PropTypes.array,
  deleteStairs: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(StairsTable));
