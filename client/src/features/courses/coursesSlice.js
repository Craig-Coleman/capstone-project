import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk("courses/fetchCourses", () => {
    return fetch("/courses")
        .then((response) => response.json())
        .then((courses) => courses)
});

export const addCourse = createAsyncThunk("courses/addCourse", (newCourse) => {
    return fetch("/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
    })
    .then(res => res.json())
    .then(course => course)
});

export const deleteCourse = createAsyncThunk("courses/deleteCourse", (courseId) => {
    return fetch(`/courses/${courseId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(course => course)
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        assignments: [],
        students: [],
        selectedCourse: null,
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
            state.courses.filter((course) => course.id !== action.payload.id);
        },
        courseSelected(state, action) {
            state.selectedCourse = action.payload
        }
    },
    extraReducers: {
        [fetchCourses.pending](state) {
            state.status = "loading";
        },
        [fetchCourses.fulfilled](state, action) {
            state.courses = action.payload;
            state.assignments = action.payload.map((course) => course.assignments)[0]
            state.students = action.payload.map((course) => course.students)
            state.status = "idle"
        },
        [addCourse.pending](state) {
            state.status = "loading";
        },
        [addCourse.fulfilled](state, action) {
            state.courses.push(action.payload);
            state.status = "idle"
        },
        [deleteCourse.pending](state) {
            state.status = "loading";
        },
        [deleteCourse.fulfilled](state, action) {
            state.courses = state.courses.filter(course => course.id !== action.payload.id);
            state.status = "idle";
        }
    },
});

export const {courseAdded, courseUpdated, courseDeleted, courseSelected} = coursesSlice.actions;

export default coursesSlice.reducer;