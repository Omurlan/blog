import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '@interface/blog';

const initialState: IBlog = {
  _id: '',
  previewImage: '',
  title: '',
  blocks: [],
  time: 0,
  author: { _id: '', avatar: '', username: '' },
  createdAt: '',
  updatedAt: '',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<IBlog>) => {
      return action.payload;
    },
  },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
