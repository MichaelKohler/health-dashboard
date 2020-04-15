import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

export default function WeightChart() {
  const {
    stats,
    statsFailed,
  } = useSelector((state) => state);

  return (
      <Grid item xs={12} md={12} lg={12}>
          {statsFailed && (
              <p>Oh no, something went wrong while fetching the stats!</p>
          )}
          {stats.weight && (
              <LineChart
                width={1100}
                height={300}
                data={stats.weight}
              >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="createdAt"/>
                  <YAxis type="number" domain={[75, 85]}/>
                  <Tooltip/>
                  <Line type="monotone" dataKey="weight" stroke="#4054b2" activeDot={{ r: 8 }}/>
              </LineChart>
          )}
      </Grid>
  );
}
