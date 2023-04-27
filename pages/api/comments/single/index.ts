import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@models';
import { ICommentPost } from '../types';
import { IComment } from '@interface/comment';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  // create comment
  if (method === 'POST') {
    try {
      const { author, comment, parentId, blogId } = req.body;

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
};

export default connectDB(handler);
