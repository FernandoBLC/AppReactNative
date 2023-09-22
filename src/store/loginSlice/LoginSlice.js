import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    pass: "",
}

export const LoginSlice = createSlice({
    name: "LoginSlice",
    initialState,
    reducers: {
        changeCredentials: (state, action) => action.payload,
    }
});

export const { changeCredentials } = LoginSlice.actions;

export default LoginSlice.reducer;