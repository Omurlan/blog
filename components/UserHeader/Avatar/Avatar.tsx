import { ComponentProps } from 'react';
import styles from './Avatar.module.css';
import cn from 'classnames';

interface AvatarProps extends ComponentProps<'img'> {
  avatar: string;
}

const Avatar: React.FC<AvatarProps> = ({ className, avatar, ...props }) => {
  return <img className={cn(styles.userIcon, className)} src={avatar} {...props} />;
};

export default Avatar;
