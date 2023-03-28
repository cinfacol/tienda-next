"use client";

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';

const reducer = {
  auth: authReducer,
}

export const store = configureStore({
  reducer,
  devTools: true,
})
