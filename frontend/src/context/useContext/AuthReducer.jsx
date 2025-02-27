const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: false,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: true,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }
            case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false
            }
        default:
            return state;
    }
}

export default AuthReducer
