"use client";

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetProducts = createAsyncThunk(
  'products/get_products',
  async (arg, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.API_URL}/api/products/all/`, config);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)

export const GetProductsByArrival = createAsyncThunk(
  'products/by_arrival',
  async (arg, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.API_URL}/api/products/all/?sortBy=date_created&order=asc&limit=3`, config);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)

export const GetProductsBySold = createAsyncThunk(
  'products/by_sold',
  async (thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.API_URL}/api/products/all/?sortBy=sold&order=desc&limit=3`, config);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)

export const get_product = createAsyncThunk(
  'products/get_product',
  async (productId, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.API_URL}/api/products/${productId}/`, config);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)

export const GetRelatedProducts = createAsyncThunk(
  'products/related',
  async (productId, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.API_URL}/api/products/related/${productId}/`, config);
      if (res.status === 200) {

        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)

export const GetFilteredProducts = createAsyncThunk(
  'products/GetFilteredProducts',
  async ({ category_id, price_range, sort_by, order }, thunkAPI) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
    try {
      const res = await axios.post(`${process.env.API_URL}/api/products/by/search/`, { category_id, price_range, sort_by, order }, config);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
)

export const get_search_products = createAsyncThunk(
  'products/get_search_products',
  async ({ search, category_id }, thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.post(`${process.env.API_URL}/api/product/search`, { search, category_id }, config);
      if (res.status === 200) {
        return res.data;
      } else {
        return thunkAPI.dispatch(Error);
      }
    } catch (error) {
      if (error.res.data) {
        return thunkAPI.rejectWithValue(error.res.data);
      } else {
        return thunkAPI.rejectWithValue(error.res.message);
      }
    }
  }
)
