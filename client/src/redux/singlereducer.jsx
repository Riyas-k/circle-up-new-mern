import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "singleUser",
  storage,
};

const singleUser = createSlice({
  name: "singleUser",
  initialState: [],
  reducers: {
    setUserDetails: (state, action) => {
      return state = action.payload;
    },
    clearUser: () => [],
  },
});

const persistedSingleUserReducer = persistReducer(
  persistConfig,
  singleUser.reducer
);

export const { setUserDetails, clearUser } = singleUser.actions;
export default persistedSingleUserReducer;
