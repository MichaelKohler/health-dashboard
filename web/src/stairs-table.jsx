import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

export default function StairsTable(props) {
  const classes = useStyles();

  return (
      <Paper className={ classes.root }>
          <Table className={ classes.table } size="small">
              <TableHead>
                  <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="right">Stairs</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  { props.rows.map((row) => (
                      <TableRow key={ row.createdAt }>
                          <TableCell align="left">{ row.createdAt }</TableCell>
                          <TableCell align="right">{ row.stairs }</TableCell>
                      </TableRow>
                  )) }
              </TableBody>
          </Table>
      </Paper>
  );
}

StairsTable.propTypes = {
  rows: PropTypes.array,
};
