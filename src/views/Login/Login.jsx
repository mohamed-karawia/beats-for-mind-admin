import React, { useState } from 'react';
// Styles 
import classes from './Login.module.scss';
// Components
import Spinner from '../../components/Spinner/Spinner';
// actions
import * as actions from '../../store/actions'
// Redux
import { useDispatch, useSelector } from 'react-redux';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    const loginLocal = (event) => {
        event.preventDefault();
        const data = {
            email,
            password
        }
        dispatch(actions.loginLocal(data))
    }


    return (
        <div className={classes.Login}>
            <form className={classes.Login__form} onSubmit={(event) => loginLocal(event)}>
            <h1 className={classes.Login__form__heading}>Login</h1>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="text"
                            placeholder="Admin email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <label className={classes.form__label}>Admin email</label>
                    </div>
                    <div className={`${classes.form__group} ${classes.field}`}>
                        <input
                            className={classes.form__field}
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label className={classes.form__label}>password</label>
                    </div>
                    {error && <p className={classes.error}>{error}</p>}
                    <button type="submit" className={classes.button}>{loading ? <Spinner /> : 'Login'}</button>
                </form>
        </div>
    )
}

export default Login
