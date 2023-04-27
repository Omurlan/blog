import { NextApiRequest, NextApiResponse } from 'next';
import { IBlog } from '@interface/blog';
import { Blog } from '@models';
import connectDB from 'middleware/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    try {
      const { blogId } = req.query;
      const blog = await Blog.findById(blogId);
      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }

  // update blog by its id
  if (method === 'PUT') {
    try {
      const { blogId } = req.query;
      const updatedBlog: IBlog = req.body;
      const blog = await Blog.findByIdAndUpdate(blogId, updatedBlog);
      res.status(201).json(blog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Произошла ошибка' });
    }
  }
};

export default connectDB(handler);
