import React from 'react';
// react-router
import { NavLink } from 'react-router-dom';
// Style
import classes from './Home.module.scss';

const Home = () => {
    return (
        <div className={classes.Home}>
            <NavLink className={classes.Home__link} to="/beats?page=1">beats</NavLink>
            <NavLink className={classes.Home__link} to="/users">users</NavLink>
        </div>
    )
}

export default Home
