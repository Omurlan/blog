import styles from './List.module.css';
import cn from 'classnames';
import { IBlog } from '@interface/blog';
import BlogItem from './Item';
import { useSession } from 'next-auth/react';

interface BlogListProps {
  blogs: IBlog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const { data: session } = useSession();

  return (
    <div className={styles.blogs}>
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
