import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import LockIcon from '@material-ui/icons/Lock';

// The usage of React.forwardRef will no longer be required for react-router-dom v6.
// see https://github.com/ReactTraining/react-router/issues/6056
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ ref } { ...props }/>); // eslint-disable-line react/display-name

export const mainListItems = (
    <div>
        <ListItem button component={ AdapterLink } to="/">
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard"/>
        </ListItem>
        <ListItem button component={ AdapterLink } to="/login">
            <ListItemIcon>
                <LockIcon/>
            </ListItemIcon>
            <ListItemText primary="Login"/>
        </ListItem>

        <Divider/>
        <ListSubheader inset>Reports</ListSubheader>

        <ListItem button component={ AdapterLink } to="/cigarettes">
            <ListItemIcon>
                <SmokingRoomsIcon/>
            </ListItemIcon>
            <ListItemText primary="Cigarettes"/>
        </ListItem>
        <ListItem button component={ AdapterLink } to="/weight">
            <ListItemIcon>
                <FitnessCenterIcon/>
            </ListItemIcon>
            <ListItemText primary="Weight"/>
        </ListItem>
    </div>
);
