import {
    AUTHORIZE_ACCOUNT,
    ACCOUNT_LOGOUT,
    ADD_FAVORITE_CITY,
    REMOVE_FAVORITE_CITY,
    ADD_SEARCHED_CITIES
} from './actions'

import accountState from './state'

export const accountReducer = (state = accountState, action) => {
    switch (action.type) {
        case AUTHORIZE_ACCOUNT:
            return {
                authorized: true,
                info: {
                    login: action.login,
                    favoritesCities: action.favoritesCities,
                    searchedCities: action.searchedCities
                }
            }
            break

        case ADD_FAVORITE_CITY:
            return {
                ...state,
                info: {
                    login: state.info.login,
                    favoritesCities: [...state.info.favoritesCities, action.cityName]
                }
            }
            break

        case REMOVE_FAVORITE_CITY:
            return {
                ...state,
                info: {
                    login: state.info.login,
                    favoritesCities: action.favoritesCities
                }
            }
            break

        case ADD_SEARCHED_CITIES:
            return {
                ...state, info: {
                    login: state.info.login,
                    favoritesCities: state.info.favoritesCities,
                    searchedCities: action.payload
                }
            }

        case ACCOUNT_LOGOUT:
            return { authorized: false, info: {} }
            break

        default:
            return state
    }
}