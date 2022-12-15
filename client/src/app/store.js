import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice';
import studentsReducer from '../features/students/studentsSlice';

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        students: studentsReducer
    },
});

export default store;

