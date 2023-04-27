import React from 'react';
import styles from './AuthorLike.module.css';
import cn from 'classnames';
import { useTypedSelector } from '@redux-hook';
import { CiHeart } from 'react-icons/ci';
import { FcLike } from 'react-icons/fc';

interface RateProps {
  active: boolean;
  canLike: boolean;
  toggleAuthorLike: () => void;
}

const AuthorLike: React.FC<RateProps> = ({ active, toggleAuthorLike, canLike }) => {
  const { avatar } = useTypedSelector((state) => state.blog.author);

  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          canLike && toggleAuthorLike();
        }}
        className={styles.likeBlock}
      >
        {active ? (
          <span className={styles.authorLike}>
            <img className={styles.avatar} src={avatar} />
            <FcLike className={styles.avatarHeart} />
          </span>
        ) : (
          canLike && <CiHeart className={styles.heart} />
        )}
      </div>
    </div>
  );
};

export default React.memo(AuthorLike);
