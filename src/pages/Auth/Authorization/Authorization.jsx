import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import AuthInput from '../../../components/AuthInput/AuthInput'
import useEmptiesInputValidator from '../../../hooks/useEmptiesInputValidator'
import { accountValidator, authorizeAccount } from '../../../redux/account/actions'
import '../Auth.scss'
import useCookie from './../../../hooks/useCookie';

const Authorization = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({
        login: '',
        password: ''
    })

    const history = useHistory()
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()

        let errors = {
            login: '',
            password: ''
        }

        errors['login'] = useEmptiesInputValidator(login, 'Это поле не может быть пустым')
        errors['password'] = useEmptiesInputValidator(password, 'Введите пароль')

        if (Object.values(errors).filter(el => el === '').length === 2) {
            const req = accountValidator(login, password)

            if (req.status === 'success') {
                dispatch(authorizeAccount(login, [req.favoritesCities], [req.searchedCities]))
                const [ , setLoginCookie] = useCookie('login', '')
                setLoginCookie(login)
                history.push('/')
            }
            if (req.status === 'error') {
                for (let key in req.errors) {
                    errors[key] = req.errors[key]
                }
            }
        }

        setFormErrors(errors)
    }

    return (
        <form className="authForm" onSubmit={onSubmit}>
            <div className="authForm__title">
                Авторизация
            </div>
            <AuthInput
                title="Логин"
                type="text"
                name="login"
                value={login}
                onChange={setLogin}
                error={formErrors.login}
            />
            <AuthInput
                title="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={setPassword}
                error={formErrors.password}
            />
            <Link to='/registration' className="authForm__link">У меня нету аккаунта</Link>
            <input type="submit" className="authForm__submit" value="Войти в аккаунт" />
        </form>
    )
}

export default Authorization