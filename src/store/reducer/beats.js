import * as actionTypes from '../actions/actionTypes'

const initalState = {
    beats: [],
    loading: false,
    total: 0,
    openAddBeat: false,
    addBeatLoading: false,
    addBeatError: ''
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.GET_BEATS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_BEATS_SUCCESS:
            return {
                ...state,
                loading: false,
                total: action.total,
                beats: action.beats
            }
            case actionTypes.SET_OPEN_ADD_BEAT:
                return {
                    ...state,
                    openAddBeat: action.open
                }
            case actionTypes.ADD_BEAT_START:
                return {
                    ...state,
                    addBeatLoading: true
                }
            case actionTypes.ADD_BEAT_SUCCESS:
                return {
                    ...state,
                    addBeatLoading: false,
                    addBeatError: '',
                    openAddBeat: false
                }
            case actionTypes.ADD_BEAT_FAILED:
                return {
                    ...state,
                    addBeatLoading: false,
                    addBeatError: action.error
                }
        default:
            return state;
    }
}

export default reducer;