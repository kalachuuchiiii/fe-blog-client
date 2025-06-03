import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAPI } from '../../helper/api/index.js'

const initialState = {
  posts: [], 
  page: 0, 
  totalPost: 0,
  isLastPage: false,
  loading: false,
  error: false
}

const getPosts = createAsyncThunk("getPosts", async(page = 0, thunkAPI) => {
  try{
    const res = await fetchAPI("get", `/posts/${page}`, {});
    
    return res.data;
  }catch(e){
   return thunkAPI.rejectWithValue(e.message);
  }
})

const uploadPost = createAsyncThunk("upload", async(form, thunkAPI) => {
  try{
        const res = await fetchAPI("post", "/post", { ...form }); 
        return res.data;
      }catch(e){
        return thunkAPI.rejectWithValue(e.message);
      }
})

const postSlice = createSlice({
  name: "posts", 
  initialState, 
  reducers: { 
    clearError: (state) => {
      state.error = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    builder.addCase(getPosts.fulfilled, (state, action) => {
      const post = action.payload.data
      state.posts = [...state.posts, ...post];
      state.totalPost = action.payload.total
      state.isLastPage = state.posts.length >= action.payload.total
      state.error = false;
      state.loading = false;
    })
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    })
    builder.addCase(uploadPost.pending, (state) => {
      state.error = false;
      state.loading = true;
    })
    builder.addCase(uploadPost.fulfilled, (state, action) => {
      const post = action.payload.data
      state.posts = [...state.posts, post];
      state.totalPost += 1;
      state.error = false;
      state.loading = false;
    })
    builder.addCase(uploadPost.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
    })
  }
})

export const actions = {
  getPosts, 
  uploadPost
}

export const { clearError, setLoading } = postSlice.actions;
export default postSlice.reducer;