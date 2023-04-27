import { ComponentProps } from 'react';
import styles from './Header.module.css';
import cn from 'classnames';
import { IBlog } from '@interface/blog';
import { UserHeader } from 'components';

interface HeaderProps extends Pick<ComponentProps<'div'>, 'className'> {
  blog: IBlog;
}

const Header: React.FC<HeaderProps> = ({ blog, className }) => {
  return (
    <div className={cn(styles.header, className)}>
      <UserHeader user={blog.author} createdAt={blog.createdAt} />
      <h1 className={styles.title}>{blog.title}</h1>

      <div className={styles.imageBlock}>
        <img className={styles.image} src={blog.previewImage} alt="Preview" />
      </div>
    </div>
  );
};

export default Header;
