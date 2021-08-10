import React from 'react';
import classes from './Navbar.module.scss';
// react-router
import { useHistory } from 'react-router-dom';
// Logo
import Logo from '../../assets/logo.png'
// Redux
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.auth.token !== null)

    const pushToHome = () => {
        history.push('/')
    }

    const logout = () => {
        dispatch(actions.logout());
    }

    return (
        <nav className={classes.Navbar}>
            <div className={classes.Navbar__logo} onClick={pushToHome}>
                <img src={Logo} alt="logo" />
            </div>
            <div className={classes.Navbar__heading}>
                <h2>Dashboard</h2>
            </div>
            <div className={classes.Navbar__auth}>
                {isAuth && <button onClick={logout}>logout</button>}
            </div>
        </nav>
    )
}

export default Navbar
