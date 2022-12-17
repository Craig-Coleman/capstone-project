import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk("students/fetchStudents", () => {
    return fetch("/students")
        .then((response) => response.json())
        .then((students) => students)
});

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
            state.status = "idle"
        },
    },
});

export default studentsSlice.reducer;