import { combineReducers } from 'redux';

import appReducer from './appReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    app: appReducer,
    auth: authReducer,
    users: usersReducer,
});