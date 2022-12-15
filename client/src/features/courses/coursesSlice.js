import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk("courses/fetchCourses", () => {
    return fetch("/courses")
        .then((response) => response.json())
        .then((data) => data)
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        assignments: [],
        status: 'idle',
        error: null
    },
    reducers: {
        courseAdded(state, action) {
            state.entities.push(action.payload)
        },
        courseUpdated(state, action) {
            const course = state.entities.find((course) => course.id === action.payload.id);
            course.title = action.payload.title;
            course.period = action.payload.period; 
            course.grade_level = action.payload.grade_level; 
        },
        courseDeleted(state, action) {
            const course = state.entities.find((course) => course.id === action.payload.id);
            state.courses.filter((course) => course.id !== action.payload.id);
        }
    },
    extraReducers: {
        [fetchCourses.pending](state) {
            state.status = "loading";
        },
        [fetchCourses.fulfilled](state, action) {
            state.courses = action.payload;
            state.assignments = action.payload.map((course) => course.assignments)[0]
            state.status = "idle"
        },
    },
});

export const {courseAdded, courseUpdated, courseDeleted} = coursesSlice.actions;

export default coursesSlice.reducer;