import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Overview from './overview.jsx';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1f3352',
    },
  },
});

const App = () => (
    <ThemeProvider theme={ theme }>
        <Overview/>
    </ThemeProvider>
);

export default App;
