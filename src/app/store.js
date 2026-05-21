import { configureStore } from "@reduxjs/toolkit";
import authReducer, { userInfo } from "../features/auth/authSlice"
import contactReducer from "../features/contact/contactSlice"
import userReducer from "../features/user/userSlice"


export const store = configureStore({
    reducer : {
        auth : authReducer,
        contact : contactReducer,
        user: userReducer,
    }
})