import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}; 

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
};

export const authFailed = (error) => {
    console.log(error)
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expireTime)
    }
}

export const saveToLocalStorage = (token, date) => {
    return dispatch => {
        const expirationDate = new Date(new Date().getTime() + date);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate);
        dispatch(authSuccess(token))
        dispatch(checkAuthTimeout(date))
    }
}

export const loginLocal = (data) => {
    return dispatch => {
        dispatch(authStart());
        console.log(data)
        axios.post('/admin/login', data)
        .then(res => {
            console.log(res)
            dispatch(saveToLocalStorage(res.data.data.token, res.data.data.expiresIn))
        })
        .catch(err => {
            console.log(err.response)
            dispatch(authFailed(err.response.data.message))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const auth = {
            token :localStorage.getItem('token'),
        }
        if (!auth.token){
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            }else {
                dispatch(authSuccess(auth.token))
            }
        }
    }
}