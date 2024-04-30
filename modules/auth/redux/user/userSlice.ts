import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserInfo = {
  name: string | null;
  surname: string | null;
  email: string | null;
  token: string | null;
};

const userFromLocalStorage = localStorage.getItem("user");
const initialState: UserInfo = userFromLocalStorage
  ? JSON.parse(userFromLocalStorage)
  : {
      name: null,
      email: null,
      surname: null,
      token: null,
    };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserInfo>) {
      console.log("action", action.payload);

      localStorage.setItem("user", JSON.stringify(action.payload));

      return { ...state, ...action.payload };
    },
    logout(state) {
      localStorage.clear();

      return initialState;
    },
  },
});

//actions
export const { login, logout } = userSlice.actions;

//reducer
export default userSlice.reducer;
