import {AUTHENTICATE_USER, LOGOUT_USER} from "./type";

import {base_url} from "../../constants";

export const signup = (user) => {
    console.log(user);
    return async () => {
        try {
            const response = await fetch(`${base_url}/auth/signup`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    password: user.password
                })
            });

            const jsonResponse = await response.json();
            return jsonResponse;

        } catch (error) {
            console.log(error);
        }
    }
}

export const authenticate = (username, password) => {
    console.log(username, password);
    return async (dispatch) => {
        const response = await fetch(`${base_url}/auth/signin`, {
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const jsonResponse = await response.json();
        if (response.status === 201) {

            window.localStorage.setItem('auth', JSON.stringify(response));
            console.log(jsonResponse);
            dispatch({
                type: AUTHENTICATE_USER,
                auth: jsonResponse
            });
        }

        return jsonResponse;
    }
}

export const logout = () => {
    return dispatch => {
        const authData = window.localStorage.getItem('auth');
        if (authData) {
            window.localStorage.clear();
            dispatch({
                type: LOGOUT_USER,
                payload: ''
            });
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}

export const getToken = () => {
    return dispatch => {
        const authData = window.localStorage.getItem('auth');

        if (authData) {
            const auth = JSON.parse(authData);
            if (auth.hasOwnProperty('token') && auth.token !== '') {
                dispatch({
                    type: AUTHENTICATE_USER,
                    auth: auth
                });

                return Promise.resolve(true);

            }
        }

        return Promise.resolve(false);

    }
}
