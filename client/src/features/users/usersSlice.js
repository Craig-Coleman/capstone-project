import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: [],
        status: 'idle',
        error: null
    },
    reducers: {
        userAdded(state, action) {
            state.entities = action.payload;
        },
        userRemoved(state) {
            state.entities = [];
        }
    },
    extraReducers: {
    },
});

export const { userAdded, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;