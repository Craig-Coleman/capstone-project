import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    courses: [],
    status: 'idle',
    error: null
};

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        courseAdded: {
            reducer(state, action) {
                state.courses.push(action.payload)
            }
        },
        courseDeleted: {
            reducer(state, action) {
                const courseId = action.payload
                state.courses.filter((course) => course.id !== courseId)
            }
        }
    }
});

export const fetchCourses = createAsyncThunk('courses/fetchCourses', 
    fetch('/courses'))

export const { courseAdded, courseDeleted } = coursesSlice.actions;

export default coursesSlice.reducer;

export const selectAllCourses = state => state.courses.courses;

export const selectCourseById = (state, courseId) =>
    state.courses.courses.find(course => course.id === courseId);