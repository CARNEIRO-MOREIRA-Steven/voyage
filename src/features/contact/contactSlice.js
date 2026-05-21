/* eslint-disable no-unexpected-multiline */
import { createAsyncThunk, createSlice  } from "@reduxjs/toolkit";

import { apiRequest } from "../../api/apiClients";

const storedClient = localStorage.getItem('client')


const initialState = {
    clients: storedClient ?JSON.parse(storedClient) : [],

    status: 'waiting',
    error : null,
}

export const getClient = createAsyncThunk(
    'contact/getClient',

    async(_, {
        rejectWithValue
    }) => {
        try {
            return await apiRequest('/contact/index.php',{
                method: 'GET',
            }
            )
        } catch(error){
            return rejectWithValue
            (error.message)
        }
    }
)

export const contactClient = createAsyncThunk(
    'contact/contactClient',

    async(contactInfos, {rejectWithValue}) => {
        try {
            return await apiRequest('/contact/store.php',{
                method: 'POST',
                body: JSON.stringify(contactInfos),

            })
        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)

const contactSlice = createSlice({
    name : 'client',
    initialState,
    reducers :{

    },

    extraReducers : (builder) => {
        builder

        .addCase(getClient.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getClient.fulfilled, (state, action) => {
            state.status = 'success'
            state.clients = action.payload
        })
        .addCase(getClient.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.payload
        })
        .addCase(contactClient.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(contactClient.fulfilled, (state, action) =>{
            state.status = "success"
            state.clients = action.payload
        })

    }
})

export default contactSlice.reducer;