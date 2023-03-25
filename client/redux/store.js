import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/slices/userSlice';

const reducer = {
  user: userReducer,
}

const store = configureStore({
  reducer,
  devTools: true,
})

export default store;
