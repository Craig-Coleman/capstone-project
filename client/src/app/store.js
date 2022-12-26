import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice';
import studentsReducer from '../features/students/studentsSlice';
import usersReducer from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, coursesReducer)


export const store = configureStore({
    reducer: {
        courses: persistedReducer,
        students: studentsReducer,
        users: usersReducer,
    },
    middleware: [thunk]
});

export const persistor = persistStore(store)


