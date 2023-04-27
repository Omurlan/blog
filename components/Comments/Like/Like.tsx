import React from 'react';
import cn from 'classnames';
import styles from './Like.module.css';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

interface RateProps {
  active: boolean;
  count: number;
  toggleLike: () => void;
}

const Rate: React.FC<RateProps> = ({ active, toggleLike, count }) => {
  return (
    <div className={styles.rate}>
      <div className={styles.likeBlock}>
        {active ? (
          <AiFillLike onClick={toggleLike} className={cn(styles.like, styles.active)} />
        ) : (
          <AiOutlineLike onClick={toggleLike} className={styles.like} />
        )}
      </div>
      <span className={styles.count}>{count ? count : ''}</span>
    </div>
  );
};

export default Rate;
