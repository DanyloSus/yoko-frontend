import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserInfo = {
  id: number | null;
  name: string | null;
  surname: string | null;
  email: string | null;
  token: string | null;
  isAdmin: boolean | null;
};

let initialState: UserInfo = {
  id: null,
  name: null,
  email: null,
  surname: null,
  token: null,
  isAdmin: null,
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
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error storing user data in localStorage:", error);
      }

      return { ...state, ...action.payload };
    },
    logout() {
      localStorage.removeItem("user");
      return {
        id: null,
        name: null,
        email: null,
        surname: null,
        token: null,
        isAdmin: null,
      };
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
