import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk("students/fetchStudents", (id) => {
    return fetch(`courses/${id}/students`)
    .then(res => res.json())
    .then(students => students);
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
    .then(student => student);
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", (id) => {
    return fetch(`/students/${id}`, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(student => student);
});

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        students: [{assignments: [{score: ""}]}],
        status: 'idle',
        error: null
    },
    reducers: {
        updateStudentAssignment(state, action) {
            state.student = state.students.find(student => student.id === action.payload.student)
            state.assignment = state.student.assignments.find(assignment => assignment.id === action.payload.assignment);
            state.assignment.score = action.payload.score;
            state.student.assignments = state.student.assignments.filter(assignment => assignment.id !== action.payload.assignment);
            state.student.assignments.push(state.assignment);
            state.students = state.students.filter(student => student.id !== action.payload.student);
            state.students.push(state.student);
        }
    },
    extraReducers: {
        [fetchStudents.pending](state) {
            state.status = "loading"
        },
        [fetchStudents.fulfilled](state, action) {
            state.students = action.payload
            state.status = "idle";
        },
        [addStudent.pending](state) {
            state.status = "loading";
        },
        [addStudent.fulfilled](state,action) {
            state.students.push(action.payload);
            state.status = "idle";
        },
        [updateStudent.pending](state) {
            state.status = "loading"
        },
        [updateStudent.fulfilled](state, action) {
            state.students = state.students.filter(student => student.id !== action.payload.id);
            state.students.push(action.payload);
            state.status = "idle";
        },
        [deleteStudent.pending](state) {
            state.status = "loading";
        },
        [deleteStudent.fulfilled](state, action) {
            state.students = state.students.filter(student => student.id !== action.payload.id);
            state.status = "idle";
        },
    },
});

export const { updateStudentAssignment } = studentsSlice.actions;

export default studentsSlice.reducer;