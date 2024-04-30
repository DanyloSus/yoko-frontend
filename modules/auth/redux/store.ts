//import from libraries
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;

//type of store
export type Store = ReturnType<typeof store.getState>;
