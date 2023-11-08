import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage/session';
import authReducer from './reducer/auth';
import siteReducer from './reducer/site';
import userReducer from './reducer/user';
import sortSlice from './reducer/sort';

const persistConfig = {
	key: 'auth',
	storage,
	whitelist: ['isLogged'],
};

const reducers = combineReducers({
	auth: persistReducer(persistConfig, authReducer),
	user: userReducer,
	site: siteReducer,
	sort: sortSlice,
});

export const store = configureStore({
	reducer: reducers,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
