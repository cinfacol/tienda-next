"use client";

import { createSlice } from '@reduxjs/toolkit';
import { getProducts, get_product, get_search_products, get_filtered_products } from './productsService';

const initialState = {
  products: null,
  product: null,
  search_products: null,
  filtered_products: null,
  status: 'idle'
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products = action.payload.results;
    })
    .addCase(getProducts.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(get_search_products.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(get_search_products.fulfilled, (state, action) => {
      state.status = 'idle';
      state.search_products = action.payload.search_products;
      state.error = action.payload.error;
    })
    .addCase(get_search_products.rejected, (state, action) => {
      state.status = 'idle';
      // state.error = action.error.message
    })
    .addCase(get_filtered_products.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(get_filtered_products.fulfilled, (state, action) => {
      state.status = 'idle';
      state.filtered_products = action.payload.filtered_products;
      state.error = action.payload.error;
    })
    .addCase(get_filtered_products.rejected, (state, action) => {
      state.status = 'idle';
      // state.error = action.error.message
    })
    .addCase(get_product.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(get_product.fulfilled, (state, action) => {
      state.status = 'idle';
      state.product = action.payload.product;
    })
    .addCase(get_product.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
  }
})

export default productsSlice.reducer;
