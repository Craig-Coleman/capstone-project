import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk("auth/login", (userInfo) => {
    return fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
      .then(res => res.json())
      .then(user => user)
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        username: "",
        status: "out"
    },
    reducers: {

    },
    extraReducers: {
        [login.pending](state) {
            state.status = "pending"
        },
        [login.fulfilled](state, action) {
            state.username = action.payload.username
            state.status = "in"
        },
    },
});

export default authSlice.reducer
