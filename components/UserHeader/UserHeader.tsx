import { ComponentProps } from 'react';
import styles from './UserHeader.module.css';
import cn from 'classnames';
import { IAuthor } from '@interface/comment';
import { convertDate } from '@helpers/date-util';
import { BsPin } from 'react-icons/bs';
import Avatar from './Avatar/Avatar';
import { Direction } from '@components/ui';

interface UserHeaderProps extends ComponentProps<'div'> {
  user: IAuthor;
  pinned?: boolean;
  pinnedBy?: string;
  vertical?: boolean;
  isAuthor?: boolean;
  createdAt: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  user,
  createdAt,
  pinnedBy,
  isAuthor = false,
  vertical = false,
  pinned = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(styles.header, className, {
        [styles.vertical]: vertical,
      })}
      {...props}
    >
      <Avatar avatar={user.avatar} />
      <div className={cn(styles.usernameAndDate)}>
        {pinned && (
          <span className={styles.pinned}>
            <BsPin /> <p className={styles.pinTitle}>Закреплен пользователем {pinnedBy}</p>
          </span>
        )}
        <Direction gap={pinned ? 7 : 0} column={!pinned}>
          <span
            className={cn(styles.username, {
              [styles.author]: isAuthor,
            })}
          >
            {user.username}
          </span>
          <time className={styles.date}>{convertDate(createdAt)}</time>
        </Direction>
      </div>
    </div>
  );
};

export default UserHeader;
