import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IComment } from '../../global/interfaces/comment';

interface IComments {
  comments: IComment[];
  pinnedComment: IComment | null;
  temporaryComments: IComment[];
  count: number;
}

const initialState: IComments = {
  pinnedComment: null,
  temporaryComments: [],
  comments: [],
  count: 0,
};

export interface IGetComments {
  comments: IComment[];
  pinnedComment: IComment | null;
  userComments: IComment[];
  count: number;
}

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    getComments: (state, action: PayloadAction<IGetComments>) => {
      const { comments, pinnedComment, count, userComments } = action.payload;

      state.comments = comments;
      state.pinnedComment = pinnedComment;
      state.temporaryComments = userComments;
      state.count = count;
    },
    postComment: (state, action: PayloadAction<IComment>) => {
      state.temporaryComments.unshift(action.payload);
    },
    // setPinnedComment: (state, action: PayloadAction<IComment>) => {
    //   state.pinnedComment = action.payload;
    // },
    deleteComment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const { pinnedComment, temporaryComments, comments } = state;

      if (pinnedComment?._id === id) {
        state.pinnedComment = null;
        return;
      }

      const index3 = temporaryComments.findIndex((c) => c._id === id);
      if (index3 !== -1) {
        temporaryComments.splice(index3, 1);
        return;
      }

      const index = comments.findIndex((c) => c._id === id);
      if (index !== -1) {
        comments.splice(index, 1);
      }
    },
    unpinComment: (state) => {
      state.temporaryComments.unshift(state.pinnedComment!);
      state.pinnedComment = null;
    },
    pinComment: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      let pinnedComment = state.pinnedComment;

      const temporaryIndex = findIndex(id, state.temporaryComments);
      if (temporaryIndex !== -1) {
        state.pinnedComment = state.temporaryComments[temporaryIndex];
        state.temporaryComments.splice(temporaryIndex, 1);

        if (pinnedComment) state.temporaryComments.unshift(pinnedComment);

        return;
      }

      const commentsIndex = findIndex(id, state.comments);
      if (commentsIndex !== -1) {
        state.pinnedComment = state.comments[commentsIndex];
        state.comments.splice(commentsIndex, 1);

        if (pinnedComment) state.temporaryComments.unshift(pinnedComment);
      }
    },
    clearState: () => {
      return {
        ...initialState,
      };
    },
  },
});

const findIndex = (id: string, array: IComment[]): number => {
  let index: number = -1;

  for (let i = 0; i < array.length; i++) {
    if (array[i]._id === id) {
      index = i;
      break;
    }
  }

  return index;
};

export const {
  postComment,
  getComments,
  deleteComment,
  pinComment,
  clearState,
  // setPinnedComment,
  unpinComment,
} = commentSlice.actions;
export default commentSlice.reducer;
