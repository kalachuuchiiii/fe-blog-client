import { configureStore } from '@reduxjs/toolkit';
import postReducer from './posts/postSlice.js';

const store = configureStore({
  reducer: {
    posts: postReducer
  }
})

export default store;