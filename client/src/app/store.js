import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice';
import studentsReducer from '../features/students/studentsSlice';
import usersReducer from '../features/users/usersSlice';

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        students: studentsReducer,
        users: usersReducer,
    },
});

export default store;

