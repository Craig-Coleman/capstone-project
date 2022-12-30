import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk("data/fetchCourses", () => {
    return fetch("/courses")
        .then((response) => response.json())
        .then((courses) => courses);
});

export const addCourse = createAsyncThunk("data/addCourse", (newCourse) => {
    return fetch("/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCourse)
    })
    .then(res => res.json())
    .then(course => course);
});

export const deleteCourse = createAsyncThunk("data/deleteCourse", (courseId) => {
    return fetch(`/courses/${courseId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(course => course);
});

export const updateCourse = createAsyncThunk("data/updateCourse", (courseData) => {
    return fetch(`/courses/${courseData.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(courseData)
    })
    .then(res => res.json())
    .then(course => course);
});

export const fetchCourseGrades = createAsyncThunk("courses/fetchCourseGrades", (id) => {
    return fetch(`courses/${id}/grades`)
    .then(res => res.json())
    .then(grades => grades);
});

const coursesSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        students: [],
        courseGrades: [],
        selectedCourse: [{id: 0, title: "class", period: 1, grade_level: 9}],
        status: 'idle',
        error: null
    },
    reducers: {
        courseSelected(state, action) {
            state.selectedCourse = state.courses.filter(course => course.id === action.payload);
        },
    },
    extraReducers: {
        [fetchCourses.pending](state) {
            state.status = "loading";
        },
        [fetchCourses.fulfilled](state, action) {
            state.courses = action.payload;
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
        },
        [updateCourse.pending](state) {
            state.status = "loading"
        },
        [updateCourse.fulfilled](state, action) {
            state.courses = state.courses.filter(course => course.id !== action.payload.id);
            state.courses.push(action.payload);
            state.selectedCourse = [];
            state.selectedCourse.push(action.payload);
            state.status = "idle";
        },
        [fetchCourseGrades.pending](state) {
            state.status = "loading";
        },
        [fetchCourseGrades.fulfilled](state, action) {
            state.courseGrades = action.payload;
            state.status = "idle";
        }
    },
});

export const {courseSelected, courseDeselected, studentSelected} = coursesSlice.actions;

export default coursesSlice.reducer;