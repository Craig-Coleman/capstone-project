import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signUp = createAsyncThunk("users/signUp", (newUserInfo) => {
    return fetch('/users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserInfo),
    })
    .then(res => res.json())
    .then(user => user);
});

export const login = createAsyncThunk("users/login", (userInfo) => {
    return fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo),
    })
    .then(res => res.json())
    .then(user => user);
});

export const logout = createAsyncThunk("users/logout", () => {
    fetch("/logout", {
        method: "DELETE",
    });
});

export const editUserInfo = createAsyncThunk("users/editUserInfo", (newUserInfo) => {
    return fetch(`users/${newUserInfo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserInfo),
    })
    .then(res => res.json())
    .then(user => user);
});

export const deleteUser = createAsyncThunk("users/deleteUser", (id) => {
    fetch(`/users/${id}`, {
        method: "DELETE",
    });
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        status: 'idle',
        error: null
    },
    reducers: {
        userAdded(state, action) {
            state.user = action.payload;
        },
        userRemoved(state) {
            state.entities.shift();
        }
    },
    extraReducers: {
        [signUp.pending](state) {
            state.status = "loading";
        },
        [signUp.fulfilled](state, action) {
            if (Object.keys(action.payload).includes('errors')){
                state.error = action.payload;
            } else {
                state.user = action.payload;
            }
            state.status = "idle";
        },
        [signUp.rejected](state, action) {
            state.error = action.payload;
            console.log(action.payload)
            state.status = "idle"
        },
        [login.pending](state) {
            state.status = "loading";
        },
        [login.fulfilled](state, action) {
            if (Object.keys(action.payload).includes('error')){
                state.error = action.payload;
            } else {
                state.user = action.payload;
            }
            state.status = "idle";
        },
        [login.rejected](state, action) {
            state.error = action.payload;
            state.status = "idle";
        },
        [logout.pending](state) {
            state.status = "loading";
        },
        [logout.fulfilled](state) {
            state.user = null;
        },
        [editUserInfo.pending](state) {
            state.status = "loading";
        },
        [editUserInfo.fulfilled](state, action) {
            state.user = action.payload;
            state.status = "idle";
        },
        [deleteUser.pending](state) {
            state.status = "loading";
        },
        [deleteUser.fulfilled](state) {
            state.user = null;
            state.status = "idle";
        }
    },
});

export const { userAdded, userRemoved } = usersSlice.actions;

export default usersSlice.reducer;