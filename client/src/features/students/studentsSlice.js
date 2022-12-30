import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk("students/fetchStudents", (id) => {
    return fetch(`courses/${id}/students`)
    .then(res => res.json())
    .then(students => students);
});

export const addStudent = createAsyncThunk("students/addStudent", (newStudentInfo) => {
    const {course_id, studentInfo} = newStudentInfo
    return fetch(`/courses/${course_id}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentInfo)
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
        students: [],
        selectedStudent: [{id: 0, first_name: 'first', last_name: 'last', grade_level: 9, classification: 'student', birth_date: '1970-01-01'}],
        status: 'idle',
        error: null
    },
    reducers: {
        studentSelected(state, action) {
            state.selectedStudent = state.students.filter(student => student.id === action.payload);
        },
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
            if (Object.keys(action.payload).includes('error')){
                state.error = action.payload;
            } else {
                state.students = action.payload;
            }
        },
        [addStudent.pending](state) {
            state.status = "loading";
        },
        [addStudent.fulfilled](state, action) {
            state.students.push(action.payload);
            state.status = "idle";
        },
        [addStudent.rejected](state, action) {
            console.log(action.payload)
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

export const { updateStudentAssignment, studentSelected } = studentsSlice.actions;

export default studentsSlice.reducer;