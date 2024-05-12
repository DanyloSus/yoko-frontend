// external imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// user's info type
export type UserInfo = {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  token?: string;
  isAdmin?: boolean;
  isBlocked?: number;
};

// initial values
let initialState: UserInfo = {};

// check is dom ready
if (typeof window !== "undefined") {
  // if yes then check does user exist in local storage
  const userFromLocalStorage = localStorage.getItem("user");

  initialState = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage) // if yes then set user from local storage
    : initialState; // if no then set undefined user
}

// create slice
const userSlice = createSlice({
  name: "user", // slice's name
  initialState, // slice's initial values
  // actions
  reducers: {
    login(state, action: PayloadAction<UserInfo>) {
      // on login we save user to local storage
      localStorage.setItem("user", JSON.stringify(action.payload));

      // and set his values
      return { ...state, ...action.payload };
    },
    logout() {
      // on logout we remove user from local storage
      localStorage.removeItem("user");
      return {};
    },
    userLoad() {
      // here we load user from local storage
      const userFromLocalStorage = localStorage.getItem("user");
      return userFromLocalStorage
        ? JSON.parse(userFromLocalStorage) // if user exists in local storage then set him
        : initialState; // if no then set undefined user
    },
  },
});

//actions
export const { login, logout, userLoad } = userSlice.actions;

//reducer
export default userSlice.reducer;
