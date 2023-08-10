import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "singleUser",
  storage,
};

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    blockUser: (state, action) => {
      const { userId, isBlock } = action.payload;
      return state?.map((user) =>
        user._id === userId ? { ...user, isBlock } : user
      );
    },
    unblockUser: (state, action) => {
      const { userId, isBlock } = action.payload;
      return state?.map((user) =>
        user._id === userId ? { ...user, isBlock } : user
      );
    },
  },
});
const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUsers, blockUser, unblockUser } = userSlice.actions;
export default persistedUserReducer;
