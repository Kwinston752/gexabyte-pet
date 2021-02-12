import React, { useState } from 'react'
import './FullWeatherPopup.scss'
import { useSelector, useDispatch } from 'react-redux';
import { addPopupData, closePopup } from '../../redux/fullWeather/actions';
import { useEffect } from 'react/cjs/react.development';

const FullWeatherPopup = () => {
    const fullWeather = useSelector(state => state.fullWeather)
    const [data, setData] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        let cleanupFunction = false
        const fetchData = async (cityName) => {
            try {
                const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API}`)
                if (res.status !== 200) {
                    return setFetchError(res.status)
                }
                const jsonData = await res.json()
                if (!cleanupFunction) {
                    dispatch(addPopupData(jsonData))
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        if (fullWeather.data.fetching) {
            fetchData(fullWeather.data.fetchingCity)
        }

        setData(fullWeather.data)
    }, [fullWeather])

    const closeFullWeather = () => {
        dispatch(closePopup())
    }

    if (Object.values(data).length === 0) {
        return <></>
    }

    if (data.fetching) {
        return (
            <>
                <div className={`fullWeather__bg ${fullWeather.openned ? 'openned' : ''}`} onClick={closeFullWeather}>
                </div>
                <div className={`fullWeather ${fullWeather.openned ? 'openned' : ''} fetching`} onClick={closeFullWeather}>
                    <svg viewBox="0 0 329.26933 329" className="fullWeather__close">
                        <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                    </svg>
                    <div className="fullWeather__title">
                        {data.fetchingCity}
                    </div>
                    <div className="fullWeather__loading">
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={`fullWeather__bg ${fullWeather.openned ? 'openned' : ''}`} onClick={closeFullWeather}>
            </div>
            <div className={`fullWeather ${fullWeather.openned ? 'openned' : ''}`} onClick={closeFullWeather}>
                <svg viewBox="0 0 329.26933 329" className="fullWeather__close">
                    <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                </svg>
                <div className="fullWeather__title">
                    {data.name}
                </div>
                <div className="fullWeather__characteristics">
                    <div className="fullWeather__characteristics-item">
                        Код страны: {data.sys.country}
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Широта: {data.coord.lat}
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Долгота: {data.coord.lon}
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Состояние погоды: {data.weather[0].main}
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Температура: {(Number(data.main.temp) - 273.15).toFixed(2)}°C, {data.main.temp}K
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Давление: {data.main.pressure}mb
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Влажность: {data.main.humidity}%
                    </div>
                    <div className="fullWeather__characteristics-item">
                        Видимость: {data.visibility}vm
                    </div>
                </div>
            </div>
        </>
    )
}

export default FullWeatherPopup