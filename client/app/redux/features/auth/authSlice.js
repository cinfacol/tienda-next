import { createSlice } from "@reduxjs/toolkit";
import {
	register,
	login,
	getUser,
	activate,
	reset_password,
	reset_password_confirm
} from "./authService";

// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	// user: user || null,
  user: null,
	isError: false,
	isLoggedIn: false,
	isLoading: false,
	isSuccess: false,
	isPassReset: false,
	isPassResetSend: false,
	message: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.isPassReset = false;
			state.isPassResetSend = false;
			state.message = "";
		},
		logout: (state) => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('user');
      localStorage.removeItem('profile');
			state.user = null;
			state.isLoggedIn = false;
    },
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = false;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isLoggedIn = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(getUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isLoggedIn = true;
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.isLoading = false;
				state.message = action.payload;
				state.isError = true;
				state.user = null;
			})
			.addCase(activate.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activate.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(activate.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(reset_password.pending, (state) => {
        state.isLoading = true;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
      .addCase(reset_password.fulfilled, (state) => {
        state.isLoading = false;
				state.isSuccess = true;
				state.isPassResetSend = true;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.isLoading = false;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
			.addCase(reset_password_confirm.pending, (state) => {
        state.isLoading = true;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
      .addCase(reset_password_confirm.fulfilled, (state) => {
        state.isLoading = false;
				state.isSuccess = true;
				state.isPassResetSend = true;
      })
      .addCase(reset_password_confirm.rejected, (state, action) => {
        state.isLoading = false;
				state.isSuccess = false;
				state.isPassResetSend = false;
      })
	},
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
