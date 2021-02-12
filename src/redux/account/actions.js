export const AUTHORIZE_ACCOUNT = 'AUTHORIZE_ACCOUNT'
export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT'

export const ADD_FAVORITE_CITY = 'ADD_FAVORITE_CITY'
export const REMOVE_FAVORITE_CITY = 'REMOVE_FAVORITE_CITY'

export const ADD_SEARCHED_CITIES = 'ADD_SEARCHED_CITIES'

// Проверка авторизован ли пользователь
export const checkAuthentification = (login) => {
    let users = JSON.parse(localStorage.getItem('accounts')) || []
    users = users.map(el => JSON.parse(el))
    const account = users.filter(el => el.login === login)

    if (account.length > 0) {
        return {
            status: 'success',
            favoritesCities: account[0].favoritesCities,
            searchedCities: account[0].searchedCities
        }
    }
    return { status: 'error' }
}

// Создание аккаунта
export const registerAccount = (login, mail, password) => {
    const newAccount = JSON.stringify({ login: login, mail: mail, password: password, favoritesCities: [], searchedCities: [] })
    const users = JSON.parse(localStorage.getItem('accounts')) || []
    let errors = {
        login: '',
        mail: ''
    }

    // Порверка на уникальность логина и пароля
    if (users.length > 0) {
        const usersJson = users.map(el => JSON.parse(el))

        if (usersJson.filter(el => el.login === login).length > 0) {
            errors['login'] = 'Пользователь с таким логином уже существует'
        }
        if (usersJson.filter(el => el.mail === mail).length > 0) {
            errors['mail'] = 'Пользователь с такой почтой уже существует'
        }
    }

    // Если все проверки прошли успешно
    if (Object.keys(errors).filter(el => el === '').length === 0) {
        users.push(newAccount)
        localStorage.setItem('accounts', JSON.stringify(users))
        return { status: 'success' }
    }
    return {
        status: 'error',
        errors: errors
    }
}

// Вход в аккаунт
export const accountValidator = (login, password) => {
    let users = JSON.parse(localStorage.getItem('accounts')) || []
    if (users.length > 0) users = users.map(el => JSON.parse(el))

    let errors = {
        login: '',
        password: ''
    }

    if (users.filter(el => el.login === login).length === 0) {
        errors['login'] = 'Пользователя с таким логином не существует'
    }
    else {
        if (users.filter(el => el.login === login && el.password === password).length === 0) {
            errors['password'] = 'Неверный пароль'
        }
    }

    if (Object.values(errors).filter(el => el === '').length === 2) {
        return {
            status: 'success',
            favoritesCities: [users.filter(el => el.login)[0].favoritesCities].flat(),
            searchedCities: [users.filter(el => el.login)[0].searchedCities].flat()
        }
    }

    return {
        status: 'error',
        errors: errors
    }
}


export const authorizeAccount = (login, favoritesCities, searchedCities) => ({
    type: AUTHORIZE_ACCOUNT,
    login: login,
    favoritesCities: [...favoritesCities].flat(),
    searchedCities: [...searchedCities].flat()
})

export const accountLogout = () => ({
    type: ACCOUNT_LOGOUT
})


// Добавления города в список последних искомых городов
export const addSearchedCity = (cityName) => {
    try {
        let users = JSON.parse(localStorage.getItem('accounts')).map(el => JSON.parse(el))

        let user = users.filter(el => el.login === document.cookie.split('=')[1])[0]
        users.splice(users.indexOf(user), 1)

        if (user.searchedCities.includes(cityName)) {
            user.searchedCities.splice(user.searchedCities.indexOf(cityName), 1)
        }

        user.searchedCities = user.searchedCities.length === 0 ? [cityName] : [cityName, ...user.searchedCities]
        if (user.searchedCities.length > 5) {
            user.searchedCities = user.searchedCities.slice(0, 5)
        }
        users.push(user)
        localStorage.setItem('accounts', JSON.stringify(users.map(el => JSON.stringify(el))))

        return {
            type: ADD_SEARCHED_CITIES,
            payload: user.searchedCities
        }
    } catch (error) {
        console.log(error)
    }
}

// Добавление/удаление города в избранные
export const toggleFavoriteCity = (cityName) => {
    try {
        let users = JSON.parse(localStorage.getItem('accounts')).map(el => JSON.parse(el))

        let user = users.filter(el => el.login === document.cookie.split('=')[1])[0]
        users.splice(users.indexOf(user), 1)

        if (user.favoritesCities.includes(cityName)) {
            user.favoritesCities.splice(user.favoritesCities.indexOf(cityName), 1)
            users.push(user)
            localStorage.setItem('accounts', JSON.stringify(users.map(el => JSON.stringify(el))))
            return {
                type: REMOVE_FAVORITE_CITY,
                favoritesCities: user.favoritesCities
            }
        }

        user.favoritesCities = [...user.favoritesCities, cityName]
        users.push(user)
        localStorage.setItem('accounts', JSON.stringify(users.map(el => JSON.stringify(el))))

        return {
            type: ADD_FAVORITE_CITY,
            cityName: cityName
        }
    } catch (error) {
        console.log(error)
    }
}