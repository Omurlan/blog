import Blog from '../models/Blog';
import User from '../models/User';
import { IBlog } from '../global/interfaces/blog';
import { IUser } from '../global/interfaces/user';
import { connectDb } from '@libs/connectDb';

// mongoose returns complex data, not a plain object. getStatic props is not able to serialize such data. So we need to convert it manualy
const converToPlainObject = (doc: any[] | Object) => JSON.parse(JSON.stringify(doc));

// fetch for static rendered blogs
export const fetchBlogs = async () => {
  await connectDb();

  const blogs: IBlog[] = await Blog.find()
    .sort({ _id: -1 })
    .populate('author', '_id username avatar');
  return converToPlainObject(blogs);
};

export const fetchBlogIds = async () => {
  await connectDb();

  const blogs = await Blog.find<IBlog[]>().select('_id');

  return converToPlainObject(blogs);
};

// find blog by id
export const getBlogById = async (blogId: string) => {
  await connectDb();

  const blog = await Blog.findById<IBlog>(blogId).populate('author', '_id username avatar');

  if (blog) {
    return converToPlainObject(blog);
  }

  return blog;
};

// find user by id
export const getUserById = async (userId: string) => {
  await connectDb();

  const user = await User.findById<IUser>(userId);

  return converToPlainObject(user!);
};
