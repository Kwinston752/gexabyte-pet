const useCookie = (cookieName, initialValue, method) => {
    if (method === 'set') {
        document.cookie = `${cookieName}=${initialValue}; max-age=3600`
    }

    return [
        document.cookie.replace('/(?:(?:^|.*;\s*)'+cookieName+'\s*\=\s*([^;]*).*$)|^.*$/', "$1").replace(cookieName+'=', ''),
        (newValue) => {
            document.cookie = `${cookieName}=${newValue}`
        }
    ]
}

export default useCookie