import React, { useState } from 'react'

import { Swiper, Slide } from 'react-dynamic-swiper'
import 'react-dynamic-swiper/lib/styles.css'

import CitySlide from './CitySlide/CitySlide';
import { useSelector } from 'react-redux';

const isArraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

const Slider = () => {
    const account = useSelector(state => state.account)

    const defaultCities = ['Moskva', 'Paris', 'London', 'New York', 'Pekin']
    const [cities, setCities] = useState(defaultCities)
    const [citiesLength, setCiitesLength] = useState(0)
    const [lastSearchedCities, setlastSearchedCities] = useState(account.info.searchedCities)

    if (citiesLength != account.info.favoritesCities.length) {
        setCities([...account.info.favoritesCities, ...defaultCities].filter(onlyUnique))
        setCiitesLength(account.info.favoritesCities.length)
    }

    if (isArraysEqual(lastSearchedCities, account.info.searchedCities) === false && account.info.searchedCities !== undefined) {
        setCities([...account.info.favoritesCities, ...defaultCities, ...account.info.searchedCities].filter(onlyUnique))
        setlastSearchedCities(account.info.searchedCities)
    }

    return (
        <div className="intro__content-slider">
            <Swiper
                swiperOptions={{
                    spaceBetween: 50,
                    slidesPerView: 1
                }}
                paginationClickable={true}
            >
                {
                    cities.map(el => (
                        <Slide key={el}>
                            <CitySlide city={el} />
                        </Slide>
                    ))
                }
            </Swiper>
        </div >
    )
}

export default Slider