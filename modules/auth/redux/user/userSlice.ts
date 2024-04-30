import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserInfo = {
  name: string | null;
  surname: string | null;
  email: string | null;
  token: string | null;
};

let initialState: UserInfo = {
  name: null,
  email: null,
  surname: null,
  token: null,
};

if (typeof window !== "undefined") {
  const userFromLocalStorage = localStorage.getItem("user");
  initialState = userFromLocalStorage
    ? JSON.parse(userFromLocalStorage)
    : initialState;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserInfo>) {
      console.log("action", action.payload);

      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error storing user data in localStorage:", error);
      }

      return { ...state, ...action.payload };
    },
    logout(state) {
      localStorage.removeItem("user");

      return initialState;
    },
    userLoad(state) {
      const userFromLocalStorage = localStorage.getItem("user");
      return userFromLocalStorage
        ? JSON.parse(userFromLocalStorage)
        : initialState;
    },
  },
});

//actions
export const { login, logout, userLoad } = userSlice.actions;

//reducer
export default userSlice.reducer;
