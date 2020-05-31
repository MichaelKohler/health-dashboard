import React from 'react';
import clsx from 'clsx';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Sidebar from './sidebar.jsx';

import Login from './login.jsx';
import Logout from './logout.jsx';
import Overview from './overview.jsx';
import Cigarettes from './cigarettes.jsx';
import CigaretteForm from './cigarette-form.jsx';
import Weight from './weight.jsx';
import WeightForm from './weight-form.jsx';
import Stairs from './stairs.jsx';
import StairsForm from './stairs-form.jsx';
import Snackbar from './snackbar.jsx';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1f3352',
      success: '#40bf40',
      error: '#ff1a1a',
    },
  },
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <ThemeProvider theme={mainTheme}>
          <Snackbar/>
          <div className={classes.root}>
              <CssBaseline/>
              <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                  <Toolbar className={classes.toolbar}>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                      >
                          <MenuIcon/>
                      </IconButton>
                      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                          Dashboard
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Drawer
                variant="permanent"
                classes={{
                  paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
              >
                  <div className={classes.toolbarIcon}>
                      <IconButton onClick={handleDrawerClose}>
                          <ChevronLeftIcon/>
                      </IconButton>
                  </div>
                  <Divider/>
                  <Sidebar/>
              </Drawer>
              <main className={classes.content}>
                  <Switch>
                      <Route exact path="/" component={Overview}/>
                      <Route path="/login" component={Login}/>
                      <Route path="/logout" component={Logout}/>
                      <Route path="/cigarettes/add" component={CigaretteForm}/>
                      <Route path="/cigarettes" component={Cigarettes}/>
                      <Route path="/weight/add" component={WeightForm}/>
                      <Route path="/weight" component={Weight}/>
                      <Route path="/stairs/add" component={StairsForm}/>
                      <Route path="/stairs" component={Stairs}/>
                      <Redirect to="/"/>
                  </Switch>
              </main>
          </div>
      </ThemeProvider>
  );
}
