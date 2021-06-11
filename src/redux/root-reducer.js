import { combineReducers } from 'redux';
import appSettingsReducer from './app-settings/app-settings.reducer';
import userReducer from './user/user.reducer';

export const rootReducer = combineReducers({
    appSettingsReducer,
    userReducer
})