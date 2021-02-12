import React from 'react'
import './Header.scss'
import useCookie from './../../hooks/useCookie';
import { useDispatch } from 'react-redux';
import { accountLogout } from './../../redux/account/actions';

const Header = (props) => {
    const [loginCookie, setLoginCookie] = useCookie('login')
    const dispatch = useDispatch()

    const logout = () => {
        setLoginCookie('')
        dispatch(accountLogout())
    }

    return (
        <header className='header'>
            <div className="header__inner">
                <div className="header__inner-logo">
                    GexaWeather
                </div>
                <div className="header__inner-logout" onClick={logout}>
                    Выйти
                </div>
            </div>
        </header>
    )
}

export default Header