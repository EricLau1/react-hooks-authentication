import { ActionTypes } from '../actions/types';

const initialState = {
    user: {},
    token: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.POST_SIGNUP:
            return { ...state, user: action.payload };
        case ActionTypes.POST_SIGNIN:
            return { ...state, ...action.payload };
        case ActionTypes.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}