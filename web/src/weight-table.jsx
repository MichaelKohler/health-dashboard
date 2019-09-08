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

export default function CigaretteTable(props) {
  const classes = useStyles();

  return (
      <Paper className={ classes.root }>
          <Table className={ classes.table } size="small">
              <TableHead>
                  <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="right">Weight</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  { props.rows.map((row) => (
                      <TableRow key={ row.createdAt }>
                          <TableCell align="left">{ new Date(row.createdAt).toLocaleString() }</TableCell>
                          <TableCell align="right">{ row.weight }</TableCell>
                      </TableRow>
                  )) }
              </TableBody>
          </Table>
      </Paper>
  );
}

CigaretteTable.propTypes = {
  rows: PropTypes.array,
};
