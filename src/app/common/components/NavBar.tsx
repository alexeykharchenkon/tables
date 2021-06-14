import React from 'react';
import { observer } from 'mobx-react-lite';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useStyles } from "../styles/styles"
import { NavLink } from 'react-router-dom';

export const NavBar = observer(() => {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
        <Toolbar className={classes.navbarToolbar}>
            <Button color="inherit">
                <NavLink  to='/' className={classes.navbarButton}>Tables Creation</NavLink>
            </Button>
            <Button color="inherit">
                <NavLink  to='/filling' className={classes.navbarButton}>Tables Filling</NavLink>
            </Button>
        </Toolbar>
    </AppBar>
  );
});