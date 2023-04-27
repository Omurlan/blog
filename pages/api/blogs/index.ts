import { NextApiRequest, NextApiResponse } from 'next';
import { IBlogReq } from '@interface/blog';
import { Blog } from '@models';
import connectDB from 'middleware/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      const blogs = await Blog.find().sort({ _id: 1 });

      res.status(200).json({ blogs });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка, попробуйте позже' });
    }
  }

  // create a new blog
  if (method === 'POST') {
    try {
      const newBlog: IBlogReq = req.body;

      const session = await getServerSession(req, res, authOptions);

      const blog = await Blog.create({ ...newBlog, author: session?.user.id });

      res.status(201).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Не удалось сохранить. Попробуйте позже' });
    }
  }
};

export default connectDB(handler);
