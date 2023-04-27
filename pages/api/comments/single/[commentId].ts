import { NextApiRequest, NextApiResponse } from 'next';
import { Blog, Comment } from '@models';
import { ICommentPost } from '../types';
import { IComment } from '@interface/comment';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const { commentId } = req.query;

  // create comment
  if (method === 'POST') {
    const { blogId } = req.query;

    try {
      const { author, comment, parentId }: Omit<ICommentPost, 'blogId'> = req.body;

      const doc: ICommentPost = { author, comment, blogId: blogId as string };

      //  if parentId exists that it's a child comment
      if (parentId) doc.parentId = parentId;

      const notPopulated = await Comment.create(doc);

      const savedComment: IComment = await notPopulated.populate('author', '_id username avatar');

      // add replied id to parent replies array of replied ids
      if (parentId) {
        await Comment.findByIdAndUpdate(parentId, { $push: { replies: savedComment._id } });
      }

      res.status(201).json(savedComment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }

  // get comment by id
  if (method === 'GET') {
    try {
      const comment = await Comment.findById(commentId).populate('author', 'username _id avatar');

      res.status(200).json(comment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка', success: false });
    }
  }

  // update comment
  if (method === 'PUT') {
    const { comment } = req.query;
    try {
      await Comment.findByIdAndUpdate(commentId, { comment });

      res.status(200).json({ message: 'Comment updated', success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка', success: false });
    }
  }

  // remove comment
  if (method === 'DELETE') {
    const { isPinned, commentId, blogId } = req.query;

    try {
      if (!commentId) {
        return res.status(500).json({ message: "Query parameter 'commentId' is required" });
      }

      if (isPinned) {
        await Blog.findByIdAndUpdate(blogId, { pinnedComment: null });
      }

      await Comment.findByIdAndDelete(commentId);
      res.status(200).json({ success: true, message: 'Comment has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }
};

export default connectDB(handler);
