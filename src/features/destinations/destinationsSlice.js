import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { apiRequest } from "../../api/apiClients";

const storedDestination = localStorage.getItem('destinations')

const initialState = {

    destinations : storedDestination ?JSON.parse(storedDestination) : [],

    status : 'waiting',
    error : null

}