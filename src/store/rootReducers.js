import { combineReducers } from "@reduxjs/toolkit";

import LoginEmpresaReducer from "./loginSlice/LoginSlice";

const rootReducer = combineReducers({
    LoginEmpresaReducer,
});

export default rootReducer;