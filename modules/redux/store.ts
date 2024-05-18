// external imports
import { configureStore } from "@reduxjs/toolkit";

// internal imports
import darkThemeSlice from "./darkTheme/darkThemeSlice";
import userSlice from "./user/userSlice";

// store for site's manager
const store = configureStore({
  reducer: {
    user: userSlice,
    theme: darkThemeSlice,
  },
});

export default store;

//type of store
export type Store = ReturnType<typeof store.getState>;
