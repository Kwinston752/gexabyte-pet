import {
    OPEN_POPUP,
    CLOSE_POPUP,
    ADD_POPUP_DATA,
    OPEN_POPUP_WITHOUT_DATA
} from './actions'

import fullWeatherState from './state'

export const fullWeatherReducer = (state = fullWeatherState, action) => {
    switch (action.type) {
        case OPEN_POPUP:
            return { ...state, openned: true }
        case OPEN_POPUP_WITHOUT_DATA:
            return { ...state, openned: true, data: { fetching: true, fetchingCity: action.payload} }
        case ADD_POPUP_DATA:
            return { ...state, data: action.payload }
        case CLOSE_POPUP:
            return { openned: false, data: {}, fetching: {status: false} }
        default:
            return state
    }
}