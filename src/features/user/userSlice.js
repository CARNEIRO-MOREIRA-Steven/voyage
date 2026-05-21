import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRequest } from '../../api/apiClients'

import { useSelector } from "react-redux";

const storedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    users: [],
    token: storedUser?.accessToken || null,
    status: 'idle',
    error: null,
    currentUser: storedUser || null,
};


export const getUser = createAsyncThunk(
    'user/getUser',

    async (_, {
        rejectWithValue
    }) => {
        try {
            return await apiRequest('/users/index.php', {
                method: 'GET',
            })
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const updateProfil = createAsyncThunk(
    'user/updateProfil',
    async (updateUserInfo, { rejectWithValue, getState }) => {
        try {
            const token = getState().auth.token;

            const response = await apiRequest('/profile/update.php', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updateUserInfo)
            });

            console.log(response);

            return response;

        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.users = action.payload
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
            .addCase(updateProfil.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateProfil.fulfilled, (state, action) => {
                state.status = 'success'
                state.currentUser = action.payload.user
                localStorage.setItem('user',JSON.stringify(action.payload));
            })
            .addCase(updateProfil.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export default userSlice.reducer