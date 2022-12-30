import Blog from "../models/Blog";
import connect from "../lib/connect";

export const fetchAllBlogs = async () => {
  await connect();

  const blogs = JSON.stringify(await Blog.find());
  return JSON.parse(blogs);
};

export const getBlogById = async (id: string) => {
  await connect();

  const blog = JSON.stringify(await Blog.findById(id));

  // console.log(blog);

  return JSON.parse(blog);
};
