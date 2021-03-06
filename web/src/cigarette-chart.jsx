import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default function CigarettesChart() {
  const {
    stats,
    statsFailed,
  } = useSelector((state) => state);

  return (
      <Grid item xs={12} md={12} lg={12}>
          {statsFailed && (
              <p>Oh no, something went wrong while fetching the stats!</p>
          )}
          {stats.cigarettes && (
              <BarChart
                width={1100}
                height={300}
                data={stats.cigarettes}
              >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="date"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="count" fill="#1f3352"/>
              </BarChart>
          )}
      </Grid>
  );
}
