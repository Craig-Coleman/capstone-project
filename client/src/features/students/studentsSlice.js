import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk("students/fetchStudents", () => {
    return fetch("/students")
        .then((response) => response.json())
        .then((students) => students)
});

export const addStudent = createAsyncThunk("students/addStudent", (newStudentInfo) => {
    return fetch(`/courses/${newStudentInfo.course_id}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newStudentInfo)
    })
    .then(res => res.json())
    .then(student => student);
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
        [addStudent.pending](state) {
            state.status = "loading";
        },
        [addStudent.fulfilled](state,action) {
            state.students.push(action.payload);
            state.status = "idle";
        },
        [addStudent.rejected](state, action) {
            console.log(action.payload)
        }
    },
});

export default studentsSlice.reducer;