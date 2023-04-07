"use client";
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const getCategories = createAsyncThunk(
  'categories/get_categories',
  async (thunkAPI) => {
    const config = {
      headers: {
        'Accept': 'application/json'
      }
    };
    try {
      const res = await axios.get(`${process.env.API_URL}/api/categories/categories`, config);
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
