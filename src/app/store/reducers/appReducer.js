import { ActionTypes } from '../actions/types';

const initialState = {
    loading: false,
    error: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.GLOBAL_LOADING:
            return { ...state, loading: action.payload };
        case ActionTypes.GLOBAL_ERROR:
            return { ...state, error: { message: action.payload.error } };
        case ActionTypes.CLEAR_GLOBAL_ERROR:
            return { ...state, error: {} };
        default:
            return state;
    }
}