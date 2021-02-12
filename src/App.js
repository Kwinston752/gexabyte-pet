import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    HashRouter as Router,
    Redirect,
    Route,
} from "react-router-dom";
import useCookie from './hooks/useCookie';
import Authorization from './pages/auth/Authorization/Authorization';
import Registration from './pages/Auth/Registration/Registration';
import { authorizeAccount, checkAuthentification } from './redux/account/actions';
import Main from './pages/Main/Main';

const App = () => {
    const [accountStatus, setAccountStatus] = useState('fetching')

    const account = useSelector(state => state.account)
    const dispatch = useDispatch()

    useEffect(() => {
        const [loginCookie] = useCookie('login')
        if (loginCookie !== '') {
            const req = checkAuthentification(loginCookie)
            if (req.status === 'success') dispatch(authorizeAccount(loginCookie, req.favoritesCities, req.searchedCities))
        }

        setAccountStatus('fetched')
    }, [])

    return (
        <Router>
            {
                accountStatus === 'fetched' &&
                    !account.authorized ?
                    <Route exact path='/' render={() => <Redirect to='/registration' />} /> :
                    <Route exact path='/' render={() => <Main />} />
            }
            <Route path='/registration' render={() => <Registration />} />
            <Route path='/authorization' render={() => <Authorization />} />
        </Router>
    )
}

export default App