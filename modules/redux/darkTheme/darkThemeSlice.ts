// external imports
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// initial values
let initialState: string = "light";

// check is dom ready
if (typeof window !== "undefined") {
  const themeFromCollection = localStorage.getItem("theme");

  initialState = themeFromCollection
    ? themeFromCollection
    : window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// create slice
const darkThemeSlice = createSlice({
  name: "theme", // slice's name
  initialState, // slice's initial values
  reducers: {
    changeTheme(state, action: PayloadAction<string>) {
      if (action.payload === "dark") {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        return "dark";
      } else if (action.payload === "light") {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
        return "light";
      } else {
        localStorage.removeItem("theme");
        // if alreay set the value will remove it
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark");
          return "dark";
        } else {
          document.body.classList.remove("dark");
          return "light";
        }
      }
    },
  },
});

//actions
export const { changeTheme } = darkThemeSlice.actions;

//reducer
export default darkThemeSlice.reducer;