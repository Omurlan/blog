import Link from 'next/link';
import styles from './Item.module.css';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { IBlog } from '@interface/blog';
import { Button } from '@skbkontur/react-ui';
import { UserHeader } from 'components';
import Typography from '@components/ui/Typography/Typography';

dayjs.extend(calendar);

interface BlogItemProps {
  blog: IBlog;
}

const BlogItem = ({ blog }: BlogItemProps) => {
  return (
    <div className={styles.blog}>
      <div className={styles.header}>
        <UserHeader user={blog.author} createdAt={blog.createdAt} />
      </div>

      <Typography variant="title2">{blog.title}</Typography>

      <div className={styles.preview}>
        <Link href={`/blogs/${blog._id}`}>
          <img src={blog.previewImage} alt={blog.title} />
        </Link>
      </div>

      {/* <div className={styles.body}>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.previewText}>{blog.previewText}</p>

        <div className={styles.actions}>
          <Link href={`/blogs/${blog._id}/edit`}>
            <Button use="primary" className={styles.edit}>
              Редактировать
            </Button>
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default BlogItem;
