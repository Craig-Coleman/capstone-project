import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAssignments = createAsyncThunk("assignments/fetchAssignments", (id) => {
    return fetch(`/courses/${id}/assignments`)
    .then(res => res.json())
    .then(assignments => assignments);
});

export const addAssignment = createAsyncThunk("assignments/addAssignment", (newAssignment) => {
    return fetch('/assignments', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newAssignment)
    })
    .then(res => res.json())
    .then(assignment => assignment);
});

export const updateAssignment = createAsyncThunk("assignments/updateAssignment", (assignment) => {
    return fetch(`/assignments/${assignment.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    })
    .then(res => res.json())
    .then(assignment => assignment);
});

const assignmentsSlice = createSlice({
    name: 'assignments',
    initialState: {
        assignments: [],
        assignmentTitles: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: {
        [fetchAssignments.pending](state) {
            state.status = "loading";
        },
        [fetchAssignments.fulfilled](state, action) {
            state.assignments = action.payload;
            state.status = "idle";
        },
        [addAssignment.pending](state) {
            state.status = "loading";
        },
        [addAssignment.fulfilled](state, action) {
            state.assignments.push(action.payload);
            state.status = "idle";
        },
        [updateAssignment.pending](state) {
            state.status = "loading";
        },
        [updateAssignment.fulfilled](state, action) {
            state.assignments = state.assignments.filter(assignment => assignment.id !== action.payload.id);
            state.assignments.push(action.payload);
            state.status = "idle";
        }
    },
});

export default assignmentsSlice.reducer;