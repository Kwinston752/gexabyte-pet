import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AuthInput from '../../../components/AuthInput/AuthInput'
import useEmptiesInputValidator from '../../../hooks/useEmptiesInputValidator'
import { registerAccount } from '../../../redux/account/actions'
import '../Auth.scss'

const Registration = () => {
    const [login, setLogin] = useState('')
    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [formErrors, setFormErrors] = useState({
        login: '',
        mail: '',
        password: '',
        repeatPassword: ''
    })

    const history = useHistory()

    const onSubmit = e => {
        e.preventDefault()

        let errors = {
            login: '',
            mail: '',
            password: '',
            repeatPassword: ''
        }

        // Проверка полей на пустоту
        errors['login'] = useEmptiesInputValidator(login, 'Логин не может быть пустым')
        errors['mail'] = useEmptiesInputValidator(mail, 'Почтовый адрес не может быть пустым')
        errors['password'] = useEmptiesInputValidator(password, 'Минимальная длина пароля 8 символов')
        errors['repeatPassword'] = useEmptiesInputValidator(repeatPassword, 'Это поле не может быть пустым')

        //Проврека совпадают ли пароли
        if (password !== repeatPassword) errors['password'] = errors['repeatPassword'] = 'Пароли не совпадают'

        if (Object.values(errors).filter(el => el === '').length === 4) {
            const req = registerAccount(login, mail, password)

            if (req.status === 'success') history.push('/authorization')
            if (req.status === 'error') {
                for (let key in req.errors) {
                    errors[key] = req.errors[key]
                }
            }
        }

        return setFormErrors(errors)
    }

    return (
        <form className='authForm' onSubmit={onSubmit}>
            <div className="authForm__title">
                Регистрация
            </div>
            <AuthInput
                title="Логин"
                type="text"
                name="login"
                value={login}
                onChange={setLogin}
                error={formErrors['login']}
            />
            <AuthInput
                title="Почтовый адрес"
                type="email"
                name="mail"
                value={mail}
                onChange={setMail}
                error={formErrors['mail']}
            />
            <AuthInput
                title="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={setPassword}
                error={formErrors['password']}
            />
            <AuthInput
                title="Повторите пароль"
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                onChange={setRepeatPassword}
                error={formErrors['repeatPassword']}
            />
            <Link to="/authorization" className="authForm__link">У меня уже есть аккаунт</Link>
            <input type="submit" className="authForm__submit" value="Зарегестрироваться" />
        </form>
    )
}

export default Registration