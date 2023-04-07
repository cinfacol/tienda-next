"use client";
import { createSlice } from '@reduxjs/toolkit';
import { getCategories } from './categoriesService';

const initialState = {
  categories: null,
  status: 'idle',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getCategories.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.status = 'idle';
      state.categories = action.payload.categories;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
  }
})

export default categoriesSlice.reducer;
