import { NextApiRequest, NextApiResponse } from 'next';
import { Blog } from '@models';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const { blogId, commentId } = req.query;

  if (method === 'POST') {
    try {
      await Blog.findByIdAndUpdate(blogId, { pinnedComment: commentId });

      res.status(201).json({ message: 'Comment has been pinned' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка', success: false });
    }
  }

  if (method === 'DELETE') {
    try {
      await Blog.findByIdAndUpdate(blogId, { pinnedComment: null });
      res.status(200).json({ success: true, message: 'Pinned comment has been deleted' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка', success: false });
    }
  }
};

export default connectDB(handler);
