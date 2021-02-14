import axios from 'axios';
import { toast } from 'react-toastify';

const BaseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({ baseURL: BaseURL });

function responseSuccessMiddleware(response) {
    return response;
}

function responseErrorMiddleware(error) {
    if (error.response.status === 401) {
        if(localStorage.getItem('auth-token')) {
            toast.error(error.response.data.error, { position: toast.POSITION.TOP_RIGHT });
            // localStorage.removeItem('auth-token')
        }
        if(api.defaults.headers.Authorization) {
            // api.defaults.headers.Authorization = undefined;
        }
    }
    return Promise.reject(error);
}

api.interceptors.response.use(
    responseSuccessMiddleware, 
    responseErrorMiddleware
);

export default api;