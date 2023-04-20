"use client";

import { createSlice } from '@reduxjs/toolkit';
import { GetProducts, get_product, get_search_products, GetFilteredProducts, GetProductsBySold, GetProductsByArrival, GetRelatedProducts } from './productsService';

const initialState = {
  products: null,
  product: null,
  search_products: null,
  filtered_products: null,
  by_arrival: null,
  by_sold: null,
  related: null,
  status: 'idle'
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(GetProducts.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(GetProducts.fulfilled, (state, action) => {
      state.status = 'idle';
      state.products = action.payload.results;
    })
    .addCase(GetProducts.rejected, (state, action) => {
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
      state.error = action.error.message
    })
    .addCase(GetFilteredProducts.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(GetFilteredProducts.fulfilled, (state, action) => {
      state.status = 'idle';
      state.filtered_products = action.payload.filtered_products;
      state.error = action.payload.error;
    })
    .addCase(GetFilteredProducts.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
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
    .addCase(GetProductsByArrival.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(GetProductsByArrival.fulfilled, (state, action) => {
      state.status = 'idle';
      state.by_arrival = action.payload.results;
    })
    .addCase(GetProductsByArrival.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(GetProductsBySold.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(GetProductsBySold.fulfilled, (state, action) => {
      state.status = 'idle';
      state.by_sold = action.payload.results;
    })
    .addCase(GetProductsBySold.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
    .addCase(GetRelatedProducts.pending, (state) => {
      state.status = 'pending';
    })
    .addCase(GetRelatedProducts.fulfilled, (state, action) => {
      state.status = 'idle';
      state.related = action.payload.related_products;
    })
    .addCase(GetRelatedProducts.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.error.message
    })
  }
})

export default productsSlice.reducer;
