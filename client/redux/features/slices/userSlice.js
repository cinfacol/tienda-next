import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../services/userService";

const initialState = {
  users: [],
  loading: false,
  value: 10,
}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
      })
  }
})

export default userSlice.reducer;
