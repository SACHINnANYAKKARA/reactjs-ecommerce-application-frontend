import {AUTHENTICATE_USER, LOGOUT_USER} from "../actions/type";

const initState = {
    isAuthenticated: false,
    user: '',
    id: '',
    token: ''
}

const authReducers = (state = initState, action) => {
    switch (action.type) {
        case AUTHENTICATE_USER:
            state = {
                ...state,
                isAuthenticated: true,
                user: action.auth.user,
                id: action.auth.id,
                token: action.auth.token
            }
            break;
        case LOGOUT_USER:
            state = {
                isAuthenticated: false,
                user: '',
                id: '',
                token: ''
            }
            break;
        default:
            return state;
    }
    return state;
}

export default authReducers;
