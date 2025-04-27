import { createSlice } from "@reduxjs/toolkit";

// Fetching Login Status from Local Storage
const FetchLoginStatus = () => {
  const LoginStatusFromLocalStorage = localStorage.getItem("portfolioStatus");

  // Convert the string value to boolean
  if (LoginStatusFromLocalStorage === "true") {
    return true;
  } else if (LoginStatusFromLocalStorage === "false") {
    return false;
  }

  // Return false as a fallback (when no status is found)
  return false;
};

// Initial State
const initialState = {
  LogInStatus: FetchLoginStatus(),
};

// Create the slice
const NewSlice = createSlice({
  name: "Portofolio DashBoard",
  initialState,
  reducers: {
    login: (state) => {
      state.LogInStatus = true;
      localStorage.setItem("portfolioStatus", "true");
    },
    logout: (state) => {
      state.LogInStatus = false;
      localStorage.setItem("portfolioStatus", "false");
    },
  },
});

// Export actions and reducer
export const { login, logout } = NewSlice.actions;
const reducer = NewSlice.reducer;
export default reducer;
