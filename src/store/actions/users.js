import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getUsersStart = () =>{
    return {
        type: actionTypes.GET_USERS_START
    }
}

export const getUsersSuccsess = (data) =>{
    return {
        type: actionTypes.GET_USERS_SUCCESS,
        total: data.total,
        users: data.users
    }
}

export const setOpenSendMsg = (open) => {
    return {
        type: actionTypes.SET_OPEN_SEND_MSG,
        open
    }
}

export const sendMsgStart = () => {
    return {
        type: actionTypes.SEND_MSG_START
    }
}

export const sendMsgSuccess = (msg) => {
    return {
        type: actionTypes.SEND_MSG_SUCCESS,
        msg
    }
}

export const sendMsgFailed = (error) => {
    return {
        type: actionTypes.SEND_MSG_FAILED,
        error
    }
}

export const getUsers = (page) => {
    return dispatch => {
        dispatch(getUsersStart())
        axios.get(`/admin/music/users?page=${page}`)
        .then(res => {
            dispatch(getUsersSuccsess(res.data.data))
        })
        .catch(err => {
        })
    }
}

export const sendEmail = (data) => {
    return dispatch => {
        dispatch(sendMsgStart())
        axios.post('/admin/music/user/send/sms', data)
        .then(res => {
            dispatch(sendMsgSuccess('Message Sent Successfully'))
        })
        .catch(err => {
            dispatch(sendMsgFailed(err.response.data.message))
        })
    }
}

export const sendFreeBeats = (data) => {
    return dispatch => {
        dispatch(sendMsgStart());
        axios.post('/admin/music/user/downloads', data)
        .then(res => {
            dispatch(sendMsgSuccess('Beats Sent Successfully'))
        })
        .catch(err => {
            dispatch(sendMsgFailed(err.response.data.message))
        })
    }
}