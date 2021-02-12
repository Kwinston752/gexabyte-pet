export const OPEN_POPUP = 'OPEN_POPUP'
export const CLOSE_POPUP = 'CLOSE_POPUP'
export const ADD_POPUP_DATA = 'ADD_POPUP_DATA'
export const OPEN_POPUP_WITHOUT_DATA = 'OPEN_POPUP_WITHOUT_DATA'

export const openPopup = () => ({
    type: OPEN_POPUP
})

export const openPopupWithoutData = (cityName) => ({
    type: OPEN_POPUP_WITHOUT_DATA,
    payload: cityName
})

export const closePopup = () => ({
    type: CLOSE_POPUP
})

export const addPopupData = (data) => ({
    type: ADD_POPUP_DATA,
    payload: data
})