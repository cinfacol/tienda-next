"use client";

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const reducer = {
  counter: counterReducer
}

export const store = configureStore({
  reducer,
  devTools: true,
})
