import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "admin",
  storage,
};

const adminAuth = createSlice({
  name: "admin",
  initialState: [],
  reducers: {
    setAdmin: (state, action) => {
      return action.payload;
    },
    clearAdmin: () => [],
  },
});

const persistedAdmin = persistReducer(persistConfig, adminAuth.reducer);

export const { setAdmin, clearAdmin } = adminAuth.actions;
export default persistedAdmin;
