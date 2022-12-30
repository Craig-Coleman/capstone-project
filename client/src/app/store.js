import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice';
import studentsReducer from '../features/students/studentsSlice';
import assignmentsReducer from '../features/assignments/assignmentsSlice';
import usersReducer from '../features/users/usersSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const coursesPersistConfig = {
    key: 'course',
    storage,
    whitelist: ['selectedCourse', 'selectedStudent']
}

const persistedReducer = persistReducer(coursesPersistConfig, coursesReducer)


export const store = configureStore({
    reducer: {
        courses: persistedReducer,
        students: studentsReducer,
        assignments: assignmentsReducer,
        users: usersReducer,
    },
    middleware: [thunk]
});

export const persistor = persistStore(store)


