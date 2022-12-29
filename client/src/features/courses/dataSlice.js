import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCourses = createAsyncThunk("data/fetchCourses", () => {
    return fetch("/courses")
        .then((response) => response.json())
        .then((courses) => courses)
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
    .then(course => course)
});

export const deleteCourse = createAsyncThunk("data/deleteCourse", (courseId) => {
    return fetch(`/courses/${courseId}`, {
        method: "DELETE",
    })
    .then(res => res.json())
    .then(course => course)
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

export const fetchCourseStudents = createAsyncThunk("data/fetchCourseStudents", (id) => {
    return fetch(`courses/${id}/students`)
    .then(res => res.json())
    .then(students => students)
});

export const fetchStudents = createAsyncThunk("data/fetchStudents", () => {
    return fetch("/students")
        .then((response) => response.json())
        .then((students) => students)
});

export const addStudent = createAsyncThunk("data/addStudent", (newStudentInfo) => {
    return fetch(`/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudentInfo)
    })
    .then(res => res.json())
    .then(student => student);
});

export const updateStudent = createAsyncThunk("data/updateStudent", (updatedStudentInfo) => {
    return fetch(`/students/${updatedStudentInfo.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudentInfo)
    })
    .then(res => res.json())
    .then(student => student)
});

export const deleteStudent = createAsyncThunk("data/deleteStudent", (id) => {
    return fetch(`/students/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(student => student)
});

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        courses: [],
        students: [],
        assignments: [],
        courseStudents: [],
        selectedStudent:null,
        selectedCourse: null,
        status: 'idle',
        error: null
    },
    reducers: {
        courseSelected(state, action) {
            state.selectedCourse = state.courses.filter(course => course.id === action.payload);
        },
        studentSelected(state, action) {
            state.selectedStudent = state.students.filter(student => student.id === action.payload);
        }
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
        [fetchCourseStudents.pending](state) {
            state.status = "loading"
        },
        [fetchCourseStudents.fulfilled](state, action) {
            state.courseStudents = action.payload
        },
        [fetchStudents.pending](state) {
            state.status = "loading";
        },
        [fetchStudents.fulfilled](state, action) {
            state.students = action.payload;
            state.status = "success"
        },
        [addStudent.pending](state) {
            state.status = "loading";
        },
        [addStudent.fulfilled](state,action) {
            state.students.push(action.payload);
            state.courseStudents.push(action.payload)
            state.success = "student added!";
            state.status = "idle";
        },
        [updateStudent.pending](state) {
            state.status = "loading"
        },
        [updateStudent.fulfilled](state, action) {
            state.students = state.students.filter(student => student.id !== action.payload.id);
            state.students.push(action.payload);
            state.selectedStudent = [];
            state.selectedStudent.push(action.payload);
            state.courseStudents = state.courseStudents.filter(student => student.id !== action.payload.id);
            state.courseStudents.push(action.payload);
            state.status = "idle";
        },
        [deleteStudent.pending](state) {
            state.status = "loading";
        },
        [deleteStudent.fulfilled](state, action) {
            state.students = state.students.filter(student => student.id !== action.payload.id);
            state.courseStudents = state.courseStudents.filter(student => student.id !== action.payload.id);
            state.status = "idle";
        }
    },
});

export const {courseSelected, studentSelected} = dataSlice.actions;

export default dataSlice.reducer;