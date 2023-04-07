"use client";

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import productsReducer from './features/products/productsSlice';
import reviewsReducer from './features/reviews/reviewsSlice';
import categoriesReducer from './features/categories/categoriesSlice';

const reducer = {
  auth: authReducer,
  products: productsReducer,
  reviews: reviewsReducer,
  categories: categoriesReducer,
}

export const store = configureStore({
  reducer,
  devTools: true,
})
