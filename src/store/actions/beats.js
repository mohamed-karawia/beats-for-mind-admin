import * as actionTypes from './actionTypes';
// Axios
import axios from 'axios';

export const getBeatsStart = () => {
    return {
        type: actionTypes.GET_BEATS_START
    }
}

export const setOpenAddBeat = (open) => {
    return {
        type: actionTypes.SET_OPEN_ADD_BEAT,
        open
    }
}

export const addBeatStart = () => {
    return {
        type: actionTypes.ADD_BEAT_START
    }
}

export const addBeatSuccess = () => {
    return {
        type: actionTypes.ADD_BEAT_SUCCESS
    }
}

export const addBeatFailed = (error) => {
    console.log('faile')
    return {
        type: actionTypes.ADD_BEAT_FAILED,
        error
    }
}

export const getBeatsSuccess = (data) => {
    return {
        type: actionTypes.GET_BEATS_SUCCESS,
        beats: data.beet,
        total: data.total
    }
}


export const getBeats = (queries) => {
    return dispatch => {
        dispatch(getBeatsStart())
        let link = `/admin/music/beats?sort=2&page=${queries.page}`
        if(queries.search){
            link = `/admin/music/beats?sort=2&page=${queries.page}&searchQ=${queries.search}`
        }
        axios.get(link)
        .then(res => {
            dispatch(getBeatsSuccess(res.data.data))
        })
        .catch(err => {
        })
    }
}

export const addBeat = (beat, queries) => {
    return dispatch => {
        dispatch(addBeatStart())
        axios.post('/admin/music/beet', beat)
        .then(res => {
            dispatch(addBeatSuccess())
            dispatch(getBeats(queries))
            dispatch(setOpenAddBeat(false))
        })
        .catch(err => {
            dispatch(addBeatFailed(err.response.data.data[0].msg))

        })
    }
}

export const deleteBeat = (id, queries) => {
    return dispatch => {
        dispatch(getBeatsStart())
        axios.delete('/admin/music/beat', {data: id})
        .then(res => {
            dispatch(getBeats(queries))
        })
        .catch(err => {
        })
    }
}

