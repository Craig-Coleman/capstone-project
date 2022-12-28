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

export const updateCourse = createAsyncThunk("courses/updateCourse", (courseData) => {
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

export const fetchStudents = createAsyncThunk("students/fetchStudents", () => {
    return fetch("/students")
        .then((response) => response.json())
        .then((students) => students)
});

export const addStudent = createAsyncThunk("students/addStudent", (newStudentInfo) => {
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

export const updateStudent = createAsyncThunk("students/updateStudent", (updatedStudentInfo) => {
    return fetch(`/students/${updatedStudentInfo.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedStudentInfo)
    })
    .then(res => res.json())
    .then(student => student)
})

const dataSlice = createSlice({
    name: 'courses',
    initialState: {
        courses: [],
        courseAssignments: [],
        courseStudents: [],
        students: [],
        assignments: [],
        selectedStudent:null,
        selectedCourse: null,
        status: 'idle',
        error: null
    },
    reducers: {
        courseSelected(state, action) {
            state.selectedCourse = action.payload
        },
        studentSelected(state, action) {
            state.selectedStudent = action.payload
        }
    },
    extraReducers: {
        [fetchCourses.pending](state) {
            state.status = "loading";
        },
        [fetchCourses.fulfilled](state, action) {
            state.courses = action.payload;
            state.courseAssignments = action.payload.map((course) => course.assignments)[0]
            state.courseStudents = action.payload.map((course) => course.students)
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
            state.courses.push(action.payload)
            state.status = "idle";
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
            state.success = "student added!";
            state.status = "idle";
        },
        [updateStudent.pending](state) {
            state.status = "loading"
        },
        [updateStudent.fulfilled](state, action) {
            state.students.filter(student => student.id !== action.payload.id);
            state.students.push(action.payload);
            state.status = "idle";
        }
    },
});

export const {courseSelected, studentSelected} = dataSlice.actions;

export default dataSlice.reducer;