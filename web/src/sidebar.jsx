import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ ref } { ...props }/>); // eslint-disable-line react/display-name

const mapStateToProps = (state) => state;

// eslint-disable-next-line react/no-multi-comp
export function Sidebar(props) {
  return (
      <List>
          <ListItem button component={AdapterLink} to="/">
              <ListItemIcon>
                  <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
          </ListItem>
          {!props.isLoggedIn && (
              <ListItem button component={AdapterLink} to="/login">
                  <ListItemIcon>
                      <LockIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Login"/>
              </ListItem>
          )}
          {props.isLoggedIn && (
              <ListItem button component={AdapterLink} to="/logout">
                  <ListItemIcon>
                      <LockOpenIcon/>
                  </ListItemIcon>
                  <ListItemText primary="Logout"/>
              </ListItem>
        )}

          <Divider/>
          <ListSubheader inset>Reports</ListSubheader>

          <ListItem button component={AdapterLink} to="/cigarettes">
              <ListItemIcon>
                  <SmokingRoomsIcon/>
              </ListItemIcon>
              <ListItemText primary="Cigarettes"/>
          </ListItem>
          <ListItem button component={AdapterLink} to="/weight">
              <ListItemIcon>
                  <FitnessCenterIcon/>
              </ListItemIcon>
              <ListItemText primary="Weight"/>
          </ListItem>
          <ListItem button component={AdapterLink} to="/stairs">
              <ListItemIcon>
                  <DirectionsRunIcon/>
              </ListItemIcon>
              <ListItemText primary="Stairs"/>
          </ListItem>
      </List>
  );
}

Sidebar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default connect(
  mapStateToProps,
)(Sidebar);
