import React from 'react';
import styles from './List.module.css';
import { IComment } from '@interface/comment';
import CommentItem from './Item';

interface CommentListProps {
  comments: IComment[] | any[];
  pinnedComment: IComment | null;
  temporaryComments: IComment[];
  // userComments: IComment[];
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  pinnedComment,
  // userComments,
  temporaryComments,
}) => {
  return (
    <div className={styles.comments}>
      {pinnedComment && <CommentItem key={pinnedComment._id} pinned comment={pinnedComment} />}

      {temporaryComments.map((comment) => (
        <CommentItem comment={comment} key={comment._id} />
      ))}
      {/* 
      {userComments.map((comment) => (
        <CommentItem comment={comment} key={comment._id} />
      ))} */}

      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment._id} />
      ))}
    </div>
  );
};

export default CommentList;
