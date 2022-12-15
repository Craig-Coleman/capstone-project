import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from '../features/courses/coursesSlice'
import authReducer from '../components/authSlice'

const store = configureStore({
    reducer: {
        courses: coursesReducer,
        auth: authReducer,
    },
});

export default store;

