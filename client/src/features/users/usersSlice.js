import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const editUserInfo = createAsyncThunk("users/editUserInfo", (newUserInfo) => {
    return fetch(`users/${newUserInfo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo),
    })
    .then(res => res.json())
    .then(user => user)
});

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
            state.entities.shift();
        }
    },
    extraReducers: {
        [editUserInfo.pending](state) {
            state.status = "loading";
        },
        [editUserInfo.fulfilled](state, action) {
            state.entities = action.payload;
            state.status = "idle"
        },
    },
});

export const { userAdded, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;