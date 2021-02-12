import React, { useState } from 'react'
import './CitiesSearch.scss'
import SearchForm from './SearchForm/SearchForm'
import SearchResult from './SearchResult/SearchResult'

const CitiesSearch = () => {
    const [cityName, setCityName] = useState('')
    const [fetchingCity, setFetchingCity] = useState('')
    const [searchResult, setSearchResult] = useState({})

    return (
        <div className="citiesSearch">
            <SearchForm
                cityName={cityName}
                onChange={setCityName}
                setSearchResult={setSearchResult}
                setFetchingCity={setFetchingCity}
            />
            <div className="citiesSearch__result">
                {
                    Object.keys(searchResult).length > 0 && <SearchResult data={searchResult} fetchingCity={fetchingCity} />
                }
            </div>
        </div>
    )
}

export default CitiesSearch