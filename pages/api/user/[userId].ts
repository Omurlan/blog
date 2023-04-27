import { NextApiRequest, NextApiResponse } from 'next';
import { IUser } from '@interface/user';
import { User } from '@models';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { userId } = req.query;

      const user: IUser = await User.findById(userId).select('-password -updatedAt');

      res.status(20).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }

  if (method === 'PUT') {
    try {
      const { userId } = req.query;
      const user: Omit<IUser, 'email' | 'updatedAt' | '_id'> = req.body;

      const updatedUser = await User.findByIdAndUpdate(userId, user);

      res.status(201).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }
};

export default connectDB(handler);
