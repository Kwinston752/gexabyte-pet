import React from 'react'
import Header from '../../components/Header/Header';

import './Main.scss'
import Intro from '../../components/Intro/Intro';
import CitiesSearch from '../../components/CitiesSearch/CitiesSearch';
import { useSelector } from 'react-redux';
import FavoritesCitiesList from '../../components/FavoritesCitiesList/FavoritesCitiesList';
import FullWeatherPopup from '../../components/FullWeatherPopup/FullWeatherPopup';

const Main = () => {
    const account = useSelector(state => state.account)

    return (
        <div className="main">
            <Header />
            <Intro />
            {
                account.info.favoritesCities.length > 0 &&
                <FavoritesCitiesList cities={account.info.favoritesCities} />
            }
            <CitiesSearch />
            <FullWeatherPopup />
        </div>
    )
}

export default Main