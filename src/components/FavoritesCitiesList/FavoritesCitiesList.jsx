import React from 'react'
import './FavoritesCitiesList.scss'
import FavoriteCity from './FavoriteCity/FavoriteCity';

const FavoritesCitiesList = (props) => {
    return (
        <div className="favoritesCities">
            <div className="favoritesCities__title">
                Избранные города:
            </div>
            {
                props.cities.map((el, index) => (
                    <li key={index}>
                        <FavoriteCity cityName={el} />
                    </li>
                ))
            }
        </div>
    )
}

export default FavoritesCitiesList