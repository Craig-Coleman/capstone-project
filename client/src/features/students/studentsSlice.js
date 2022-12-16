import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk("students/fetchStudents", () => {
    return fetch("/students")
        .then((response) => response.json())
        .then((students) => students)
});

export const fetchStudentAssignments = createAsyncThunk("students/fetchStudentAssignments", (studentId) => {
    return fetch(`students/${studentId}/assignments`)
        .then((response) => response.json())
        .then((assignments) => assignments)
})

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        students: [],
        assignments: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [fetchStudents.pending](state) {
            state.status = "loading";
        },
        [fetchStudents.fulfilled](state, action) {
            state.students = action.payload;
            state.assignments = action.payload.map((student => student.assignments))
            state.status = "idle"
        },
        [fetchStudentAssignments.pending](state) {
            state.status = "loading";
        },
        [fetchStudentAssignments.fulfilled](state, action) {
            state.assignments = action.payload;
            state.status = "idle"
        }
    },
});

export default studentsSlice.reducer;