import { IComment } from '../../global/interfaces/comment';
import { ICommentPost } from '../../pages/api/comments/types';
import apiSlice from './api';
import {
  deleteComment,
  getComments,
  postComment,
  pinComment as pinCommentAction,
  unpinComment as unpinCommentAction,
  IGetComments,
} from '../slices/commentSlice';
import { IDeleteReq, IDeleteRes, IPinRes, IPinReq, IUpdateReq } from './types';

const commentApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    // get comment list
    getComments: build.query<IGetComments, string>({
      query: (blogId) => `/comments/${blogId}`,

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: comments } = await queryFulfilled;
        dispatch(getComments(comments));
      },
    }),

    // get single comment by id
    // getComment: build.query<IComment, ICommentReq>({
    //   query: ({ commentId, blogId }) => `/comments/single/${commentId}?blogId=${blogId}`,

    //   async onQueryStarted(args, { dispatch, queryFulfilled }) {
    //     const { data } = await queryFulfilled;
    //     dispatch(setPinnedComment(data));
    //   },
    // }),

    // create comment
    postComment: build.mutation<IComment, ICommentPost>({
      query: (comment) => ({
        url: `/comments/single`,
        method: 'POST',
        body: comment,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: createdComment } = await queryFulfilled;
        dispatch(postComment(createdComment));
      },
    }),

    // update comment
    updateComment: build.mutation<IComment, IUpdateReq>({
      query: ({ comment, commentId }) => ({
        url: `/comments/single/${commentId}`,
        method: 'PUT',
        body: { comment },
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const { data: createdComment } = await queryFulfilled;
        dispatch(postComment(createdComment));
      },
    }),

    // delete comment by id
    removeComment: build.mutation<IDeleteRes, IDeleteReq>({
      query: ({ blogId, commentId, isPinned }) => ({
        url: `/comments/single/${commentId}?blogId=${blogId}&isPinned=${isPinned}`,
        method: 'DELETE',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(deleteComment(args.commentId));
      },
    }),

    // pin comment on the top
    pinComment: build.mutation<IPinRes, IPinReq>({
      query: (obj) => ({
        url: `/comments/pin/${obj.blogId}?commentId=${obj.commentId}`,
        method: 'POST',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(pinCommentAction(args.commentId));
      },
    }),

    // unpin comment and move into temporary comments
    unpinComment: build.mutation<IDeleteRes, string>({
      query: (blogId) => ({
        url: `/comments/pin/${blogId}`,
        method: 'DELETE',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(unpinCommentAction());
      },
    }),

    // get replies for specific comment
    // getReplies: build.query<IComment[], IRepliesRequest>({
    //   query: (obj) => `/comments/${obj.blogId}?parentId=${obj.parentId}`,
    // }),

    // create reply
    postReply: build.mutation<IComment, ICommentPost>({
      query: (comment) => ({
        url: `/comments/${comment.blogId}`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['replies'],
    }),

    // like comment
    likeComment: build.mutation<IComment, { userId: string; commentId: string; unlike: boolean }>({
      query: (obj) => ({
        url: `/comments/like/${obj.commentId}${obj.unlike ? '?unlike=true' : ''}`,
        method: 'POST',
        body: obj.userId,
      }),
    }),

    // author like
    authorLike: build.mutation<IComment, { commentId: string; remove: boolean }>({
      query: (obj) => ({
        url: `/comments/like/${obj.commentId}${obj.remove ? '?removeAuthorLike=true' : ''}`,
        method: 'PUT',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCommentsQuery,
  // useLazyGetCommentQuery,
  useLazyGetCommentsQuery,
  useAuthorLikeMutation,
  useUpdateCommentMutation,
  // useGetCommentQuery,
  useUnpinCommentMutation,
  useRemoveCommentMutation,
  usePinCommentMutation,
  usePostCommentMutation,
  usePostReplyMutation,
  useLikeCommentMutation,
} = commentApi;

export default commentApi;
