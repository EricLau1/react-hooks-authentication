import { ActionTypes } from '../actions/types';

const initialState = {
    list: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ActionTypes.GET_USERS:
            return { ...state, list: action.payload };
        case ActionTypes.DELETE_USER: {
            const newList = state.list.filter(user => user.id !== action.payload.id);

            return { ...state, list: newList };
        }
        default:
            return state;
    }
}