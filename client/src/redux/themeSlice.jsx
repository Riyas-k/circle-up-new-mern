import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  mode: "light",
  chat:false,
  userLoading:false,
  blockLoading:false
};

const persistConfig={
  key:'theme',
  storage
}

const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setChatLoading: (state) => {
      state.chat = !state.chat;
    },
    setUserLoading: (state) => {
      state.userLoading = !state.userLoading;
    },
    setBlockLoading: (state) => {
      state.userLoading = !state.userLoading;
    },
  },
});

const persistTheme = persistReducer(persistConfig,theme.reducer)

export const { setMode,setChatLoading,setUserLoading,setBlockLoading } = theme.actions;
export default persistTheme;
