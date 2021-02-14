import { ActionTypes } from './types';
import api from '../../api';

const defaultSuccessCallback = () => {};
const defaultErrorCallback = () => {};

export function postSignUp(values, successCallback = defaultSuccessCallback, errorCallback = defaultErrorCallback) {
    return async dispatch => {
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: true });
        try {
            const response = await api.post('/signup', values);
            successCallback(response);
            dispatch({ type: ActionTypes.POST_SIGNUP, payload: response.data });
        } catch (err) {
            console.log(err.response);
            errorCallback(err.response);
            dispatch({ type: ActionTypes.GLOBAL_ERROR, payload: err.response.data });
        }
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: false });
    }
}

export function postSignIn(values, successCallback = defaultSuccessCallback, errorCallback = defaultErrorCallback) {
    return async dispatch => {
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: true });
        try {
            const response = await api.post('/signin', values);
            successCallback(response);
            dispatch({ type: ActionTypes.POST_SIGNIN, payload: response.data });
        } catch (err) {
            errorCallback(err.response);
            dispatch({ type: ActionTypes.GLOBAL_ERROR, payload: err.response.data });
        }
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: false });
    }
}

export function getUser(id, successCallback = defaultSuccessCallback, errorCallback = defaultErrorCallback) {
    return async dispatch => {
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: true });
        try {
            const response = await api.get('/users/'+id);
            successCallback(response);
            dispatch({ type: ActionTypes.GET_USER, payload: response.data });
        } catch (err) {
            errorCallback(err.response);
            dispatch({ type: ActionTypes.GLOBAL_ERROR, payload: err.response.data });
        }
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: false });
    }
}

export function getUsers(successCallback = defaultSuccessCallback, errorCallback = defaultErrorCallback) {
    return async dispatch => {
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: true });
        try {
            const response = await api.get('/users');
            successCallback(response);
            dispatch({ type: ActionTypes.GET_USERS, payload: response.data });
        } catch (err) {
            errorCallback(err.response);
            dispatch({ type: ActionTypes.GLOBAL_ERROR, payload: err.response.data });
        }
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: false });
    }
}

export function deleteUser(id, successCallback = defaultSuccessCallback, errorCallback = defaultErrorCallback) {
    return async dispatch => {
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: true });
        try {
            const response = await api.delete('/users/'+id);
            successCallback(response);
            dispatch({ type: ActionTypes.DELETE_USER, payload: { id } });
        } catch (err) {
            errorCallback(err.response);
            dispatch({ type: ActionTypes.GLOBAL_ERROR, payload: err.response.data });
        }
        dispatch({ type: ActionTypes.GLOBAL_LOADING, payload: false });
    }
}

export function clearGlobalError() {
    return dispatch => dispatch({ type: ActionTypes.CLEAR_GLOBAL_ERROR });   
}

export function logout(callback) {
    if(localStorage.getItem('auth-token')) {
        localStorage.removeItem('auth-token');
    }
    if( api.defaults.headers.Authorization) {
        api.defaults.headers.Authorization = undefined;
    }
    
    if(callback) callback();

    return dispatch => dispatch({ type: ActionTypes.LOGOUT });
}