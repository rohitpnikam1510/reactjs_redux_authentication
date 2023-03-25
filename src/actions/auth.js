import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    ADD_USER
} from "./types";

import AuthService from "../services/auth.service";

export const register = (username, email, contact, password, userList) => (dispatch) => {
    console.log(userList);
    if (userList.length === 0) {
        let localUserList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];
        userList = localUserList;
    }

    let userData = {};
    userData.username = username;
    userData.email = email;
    userData.contact = contact;
    userData.password = password;
    userList.push(userData);
    localStorage.setItem("userList", JSON.stringify(userList));

    dispatch({
        type: REGISTER_SUCCESS,
    });

    dispatch({
        type: SET_MESSAGE,
        payload: "You're sign up successfully!",
    });

    dispatch({
        type: ADD_USER,
        payload: { userList: userList },
    });

    return Promise.resolve();
    // return AuthService.register(username, email, contact, password).then(
    //     (response) => {
    //         dispatch({
    //             type: REGISTER_SUCCESS,
    //         });

    //         dispatch({
    //             type: SET_MESSAGE,
    //             payload: response.data.message,
    //         });

    //         return Promise.resolve();
    //     },
    //     (error) => {
    //         const message =
    //             (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //             error.message ||
    //             error.toString();

    //         dispatch({
    //             type: REGISTER_FAIL,
    //         });

    //         dispatch({
    //             type: SET_MESSAGE,
    //             payload: message,
    //         });

    //         return Promise.reject();
    //     }
    // );
};

export const login = (username, password, userList) => (dispatch) => {
    if (userList.length === 0) {
        let localUserList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];
        userList = localUserList;
    }
    console.log("userList");
    console.log(userList);
    const filteredUser = userList.filter(
        (user) => (user.username === username || user.email === username) && user.password === password
    );
    console.log("filteredUser");
    console.log(filteredUser);
    if (filteredUser.length > 0) {
        localStorage.setItem("user", JSON.stringify(filteredUser[0]));
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: filteredUser[0] },
        });
    }
    return Promise.reject();
    // return AuthService.login(username, password).then(
    //     (data) => {
    //         dispatch({
    //             type: LOGIN_SUCCESS,
    //             payload: { user: data },
    //         });

    //         return Promise.resolve();
    //     },
    //     (error) => {
    //         const message =
    //             (error.response &&
    //                 error.response.data &&
    //                 error.response.data.message) ||
    //             error.message ||
    //             error.toString();

    //         dispatch({
    //             type: LOGIN_FAIL,
    //         });

    //         dispatch({
    //             type: SET_MESSAGE,
    //             payload: message,
    //         });

    //         return Promise.reject();
    //     }
    // );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};