import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    total: 0,
    loading: false,
    openSendMsg: false,
    sendMsgLoading: false,
    sendMsgRes: '',
    sendMsgError: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USERS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                total: action.total,
                users: action.users
            }
        case actionTypes.SET_OPEN_SEND_MSG:
            if(!action.open){
                return {
                    ...state,
                    openSendMsg: action.open,
                    sendMsgRes: '',
                    sendMsgError: ''
                }
            }else{
                return {
                    ...state,
                    openSendMsg: action.open
                }
            }
        case actionTypes.SEND_MSG_START:
            return {
                ...state,
                sendMsgLoading: true
            }
        case actionTypes.SEND_MSG_SUCCESS:
            return {
                ...state,
                sendMsgLoading: false,
                sendMsgRes: action.msg
            }
        case actionTypes.SEND_MSG_FAILED:
            return {
                ...state,
                sendMsgLoading: false,
                sendMsgError: action.error
            }
        default:
            return state;
    }
}

export default reducer;