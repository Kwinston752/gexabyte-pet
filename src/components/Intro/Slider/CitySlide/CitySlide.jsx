import React, { useEffect, useState } from 'react'
import weatherSvg from '../../svg/weather.svg'
import { useDispatch } from 'react-redux';
import { addPopupData, openPopup } from '../../../../redux/fullWeather/actions';

const CitySlide = (props) => {
    const [data, setData] = useState({})
    const [dataFetched, setDataFetched] = useState(false)
    const [fetchError, setFetchError] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        let cleanupFunction = false
        const fetchData = async () => {
            try {
                const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${process.env.API}`)
                if (res.status !== 200) {
                    setFetchError(res.status)
                    return setDataFetched(true)
                }
                const jsonData = await res.json()
                console.log(jsonData)
                if (!cleanupFunction) {
                    setData(jsonData)
                    setDataFetched(true)
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchData()
        return () => cleanupFunction = true
    }, [])


    // Preloader
    if (!dataFetched) {
        return (
            <div className="slide fetching">
                <div className="status">
                    Данные загружаются
                </div>
            </div>
        )
    }

    // Fetch error
    if (fetchError !== 0) {
        return (
            <div className="slide error">
                <div className="status">
                    Ошибка загрузки данных (Код ошибки: {fetchError})
                </div>
            </div>
        )
    }

    const openFullWeather = () => {
        dispatch(addPopupData(data))
        dispatch(openPopup())
    }

    return (
        <div className="slide" onClick={openFullWeather}>
            <div className="title">{props.city}</div>
            <div className="slide__weather">
                <div className="slide__weather-status">
                    <img src={weatherSvg} alt="" />
                    {data.weather[0].main}
                </div>
                <div className="slide__weather-temperature">
                    <div className="kelvin">
                        {data.main.temp.toFixed(2)} K
                    </div>
                    <div className="celsius">
                        {(Number(data.main.temp) - 273.15).toFixed(2)} °C
                    </div>
                </div>
                <div className="slide__weather-characteristics">
                    <span>Давление: {data.main.pressure}mb</span>
                    <span>Влажность: {data.main.humidity}%</span>
                    <span>Видимость: {data.visibility}vm</span>
                </div>
            </div>
        </div>
    )
}

export default CitySlide