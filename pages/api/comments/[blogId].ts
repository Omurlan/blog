import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { IComment } from '@interface/comment';
import { ICommentOptions } from './types';
import { Blog, Comment } from '@models';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const { blogId, parentId } = req.query;

  // get comments
  if (method === 'GET') {
    try {
      const session = await getServerSession(req, res, authOptions);

      const options: ICommentOptions = {
        blogId: blogId as string,
      };

      const pinExist = await Blog.findById(blogId).select('pinnedComment');

      const { pinnedComment: pinnedId } = pinExist;

      // whether the comment is parent or child
      // if (parentId) {
      //   options.parentId = parentId as string;
      // }

      let pinnedComment: IComment | null = null;

      if (pinnedId) {
        options._id = { $ne: pinnedId };

        pinnedComment = await Comment.findById<IComment>(pinnedId).populate(
          'author',
          'username avatar _id'
        );
      }

      let userComments: IComment[] = [];

      if (session?.user?.id) {
        const userId = session.user.id;
        // not fetch comments that equal current user id
        options.author = { $ne: userId };

        const option: any = { author: userId, blogId };
        if (pinnedId) option._id = { $ne: pinnedId };

        userComments = await Comment.find(option)
          .sort({ _id: parentId ? 1 : -1 })
          .populate('author', 'username avatar _id');
      }

      // search for comments by blogId populating in the author field with actual data
      const comments = await Comment.find(options)
        .sort({ _id: parentId ? 1 : -1 })
        .populate('author', 'username avatar _id');

      console.log(comments);

      const count = comments.length + userComments.length + (pinnedComment ? 1 : 0);

      res.status(200).json({ comments, userComments, pinnedComment, count });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }
};

export default connectDB(handler);
