import connect, { IConnectStatus } from "../../../lib/connect";
import { NextApiRequest, NextApiResponse } from "next";
import Blog from "../../../models/Blog";
import { BlogInterface } from "../../../interfaces/blog";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  // подключаем базу данных
  const connectStatus: IConnectStatus = await connect();

  // проверка подключения на успешность
  if (!connectStatus.success) {
    return res.status(500).json({
      message: "Произошла ошибка на сервере. Повторите попытку позже",
    });
  }

  // выполняем логику в зависимости от метода
  switch (method) {
    case "GET": {
      try {
        const blogs = await Blog.find({});
        res.status(200).json({ blogs });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Произошла ошибка, попробуйте позже",
        });
      }
    }
    case "POST": {
      try {
        const { title, preview, author, content }: BlogInterface = req.body;
        const newBlog = {
          title,
          preview,
          author,
          content,
        };

        const blog = await Blog.create(newBlog);

        console.log(blog);
        res.status(201).json(blog);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: "Не удалось сохранить",
        });
      }
    }
    default:
      return res.status(404).json({ message: "Unsupported HTTP request" });
  }
};
