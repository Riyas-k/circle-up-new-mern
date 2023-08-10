import { configureStore } from "@reduxjs/toolkit";
import loginReducers from "./loginReducers";
import userReducer from "./userSlice";
import singleUser from "./singlereducer";
import AdminAuth from "./adminAuthReducer";
import themeReducer from "./themeSlice";
import postReducer from './postReducer';
import updatedUser from './updatedReducer';
import followReducer from './followReducer';

const store = configureStore({
  reducer: {
    login: loginReducers,
    users: userReducer,
    user: singleUser,
    admin: AdminAuth,
    theme: themeReducer,
    post:postReducer,
    update:updatedUser,
    follow:followReducer,
  }
});
export default store;
