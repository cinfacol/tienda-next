"use client";

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import reviewsReducer from './features/reviews/reviewsSlice';

const reducer = {
  auth: authReducer,
  products: productsReducer,
  reviews: reviewsReducer,
}

export const store = configureStore({
  reducer,
  devTools: true,
})
