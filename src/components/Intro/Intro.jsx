import React from 'react'

import './Intro.scss'
import Slider from './Slider/Slider'

const Intro = () => {
    return (
        <div className="intro">
            <div className="intro__content">
                <div className="intro__content-info">
                    <div className="title">
                        Gexa Weather
                    </div>
                    <div className="description">
                        Используя именно наш сервис вы будете вкурсе об изменениях погоды в любом из выбранных вами городов, не дайте природе застать себя врасплох!
                    </div>
                </div>
                <Slider />
            </div>
        </div>
    )
}

export default Intro