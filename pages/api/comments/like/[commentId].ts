import { NextApiRequest, NextApiResponse } from 'next';
import { Comment } from '@models';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const { commentId } = req.query;

  if (method === 'POST') {
    try {
      const { unlike } = req.query;
      const userId: string = req.body;

      const dbMethod = unlike ? '$pull' : '$push';

      await Comment.findByIdAndUpdate(commentId, {
        [dbMethod]: { likes: userId },
      });
      res
        .status(200)
        .json({ success: true, message: unlike ? 'Like decremented' : 'Like incremented' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }

  if (method === 'PUT') {
    try {
      const { removeAuthorLike } = req.query;

      await Comment.findByIdAndUpdate(commentId, { authorLike: !removeAuthorLike });

      res.status(200).json({
        success: true,
        message: removeAuthorLike ? 'Author like has been removed' : 'Author like has been set',
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }
};

export default connectDB(handler);
