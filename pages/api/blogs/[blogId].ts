import { NextApiRequest, NextApiResponse } from "next";
import connect from "../../../lib/connect";
import Blog from "../../../models/Blog";
import { BlogInterface } from "../../../interfaces/blog";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const connectStatus = await connect();

  if (!connectStatus.success) {
    return res.status(500).json({
      message: "Произошла ошибка на сервере. Повторите попытку позже",
    });
  }

  switch (method) {
    case "GET": {
      try {
        const { blogId } = req.query;
        const blog = await Blog.findById(blogId);
        res.status(200).json(blog);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Произошла ошибка" });
      }
    }
    case "POST": {
      try {
        const { blogId } = req.query;
        const updatedBlog: BlogInterface = req.body;
        console.log(updatedBlog);

        const blog = await Blog.findOneAndUpdate({ _id: blogId }, updatedBlog);
        console.log(blog);
        res.status(201).json(blog);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Произошла ошибка" });
      }
    }
  }
};
