const useEmptiesInputValidator = (inputValue, errorText) => {
    if (inputValue.trim() === '') {
        return errorText
    }
    return ''
}

export default useEmptiesInputValidator