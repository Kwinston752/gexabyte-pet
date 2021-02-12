import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addSearchedCity } from './../../../redux/account/actions';

const SearchForm = (props) => {
    const [searchError, setSearchError] = useState('')
    
    const dispatch = useDispatch()

    const fetchData = async (city) => {
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API}`)
        if (res.status === 200) dispatch(addSearchedCity(city))
        const jsonData = await res.json()
        props.setSearchResult(jsonData)
        props.setFetchingCity(props.cityName)
    }

    const onSubmit = e => {
        e.preventDefault()
        if (props.cityName.trim() !== '') {
            setSearchError('')
            fetchData(props.cityName)
        } else {
            setSearchError('Введите название города')
        }
    }

    return (
        <form className="citiesSearch__search" onSubmit={onSubmit}>
            <label htmlFor="cityName">Название города:</label> <br/>
            <input 
                type="text"
                value={props.cityName}
                onChange={e => props.onChange(e.target.value)}
                id="cityName"
                placeholder="Например: Moskva, Brest..."
            />
            <div className="error">{searchError}</div>
            <input type="submit" value="Найти" />
        </form>
    )
}

export default SearchForm