import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch(
      "http://localhost:8000/api/products/all/"
    );
    const data = await response.json();
    return data;
  }
);
