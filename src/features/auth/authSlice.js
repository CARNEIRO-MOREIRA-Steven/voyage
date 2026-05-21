import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { apiRequest } from '../../api/apiClients'

// Si l'utilisateur recharge la page

const storedUser = localStorage.getItem('user')
const storedToken = localStorage.getItem('token')
const storedCreateUser = localStorage.getItem('createUser')
const storedUserInfo = localStorage.getItem('userInfo')

const initialState = {

    user: storedUser ?JSON.parse(storedUser) : null ,
    token : storedToken || null,
    createUser : storedCreateUser ?JSON.parse(storedCreateUser) : null,
    userInfo : storedUserInfo ?JSON.parse(storedUserInfo) : null,

    status : 'waiting',
    //Status de nos requettes
    //waiting
    //pending
    //success
    //error

    error : null,
}

export const loginUser = createAsyncThunk(
    // nom de l'action
    'auth/loginUser',

    // fonction nous permettant de faire la connexion
    // RejectedWithValue : fonction fournie par createAsyncThunk
    // permet de retourner une erreur personnalisé : le message de notre API
    async(userInfos, { rejectWithValue }) => {
        try {
            return await apiRequest('/auth/login.php', {
                // Méthode POST
                method : 'POST',
                // on envoie les données en JSON
                body: JSON.stringify(userInfos),

            })

        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

export const registerUser = createAsyncThunk(

    'auth/registrerUser',

    async(userInfos, {rejectWithValue}) => {
        try{
            return await apiRequest('/auth/register.php',{
                method : 'POST',
                body: JSON.stringify(userInfos)
            })
        } catch(error) {
            return rejectWithValue(error.message)

        }
    }
)

export const userInfo = createAsyncThunk(
    'auth/userInfo',

    async(_, {rejectWithValue}) =>{
        try{
            return await apiRequest('/auth/me.php',{
                method:'GET',
            })
        } catch(error){
            return rejectWithValue(error.message)
        }
    }
)



const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers: {
        logoutUser : (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    },

    extraReducers : (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.user = action.payload
                state.token = action.payload.accessToken

                localStorage.setItem('user', JSON.stringify(action.payload))
                localStorage.setItem('token', action.payload.accessToken)

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.error = null
                localStorage.setItem('createUser', JSON.stringify(action.payload))
                console.log(localStorage)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'error'
                state.error = action.payload
            })
            .addCase(userInfo.pending, (state) => {
                state.status = 'pending'
                state.error = null
            })
            .addCase(userInfo.fulfilled, (state, action) => {
                state.status = 'success'
                state.userInfo = action.payload
            })
            .addCase(userInfo.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.payload
            })
    }
})

export const { logoutUser } = authSlice.actions
export default authSlice.reducer;