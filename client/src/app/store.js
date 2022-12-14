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
    whitelist: ['selectedCourse']
}

const studentsPersistConfig = {
    key: 'student',
    storage,
    whiteList: ['selectedStudent']
}

const coursesPersistedReducer = persistReducer(coursesPersistConfig, coursesReducer);
const studentsPersistedReducer = persistReducer(studentsPersistConfig, studentsReducer);


export const store = configureStore({
    reducer: {
        courses: coursesPersistedReducer,
        students: studentsPersistedReducer,
        assignments: assignmentsReducer,
        users: usersReducer,
    },
    middleware: [thunk]
});

export const persistor = persistStore(store)


