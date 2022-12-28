import { configureStore } from '@reduxjs/toolkit';
import dataReducer from '../features/courses/dataSlice';
import usersReducer from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, dataReducer)


export const store = configureStore({
    reducer: {
        courses: persistedReducer,
        users: usersReducer,
    },
    middleware: [thunk]
});

export const persistor = persistStore(store)


