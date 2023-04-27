import { useEffect } from 'react';
import styles from './Comments.module.css';
import { IBlog } from '@interface/blog';
import { useAppDispatch, useTypedSelector } from '@redux-hook';
import { useComment } from './hooks';
import { Card } from 'components/ui';
import CommentForm from './Form/Form';
import CommentList from './List/List';

import { clearState } from '@slices/commentSlice';
import { Comment as CommentLoader } from 'react-loader-spinner';
import { usePostCommentMutation } from '@api/commentApi';
import { useSession } from 'next-auth/react';

interface CommentsContainerProps {
  blog: IBlog;
}

const Comments: React.FC<CommentsContainerProps> = ({ blog: { _id: blogId } }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [postComment, { isSuccess, isLoading: isCreating }] = usePostCommentMutation();

  useEffect(() => {
    dispatch(clearState());
  }, [blogId]);

  const { comments, temporaryComments, pinnedComment, count } = useTypedSelector(
    (state) => state.comments
  );

  const handlePostComment = (value: string) => {
    postComment({ comment: value, author: session?.user.id!, blogId });
  };

  const { isLoading } = useComment(blogId);

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <>
          <h4 className={styles.title}>Комментарии {count}</h4>
          <div className={styles.formAndComments}>
            <CommentForm
              submit={handlePostComment}
              isSuccess={isSuccess}
              isLoading={isCreating}
              create
              blogId={blogId}
            />
            <CommentList
              pinnedComment={pinnedComment}
              temporaryComments={temporaryComments}
              comments={comments}
            />
          </div>
        </>
      ) : (
        <CommentLoader
          visible
          height={60}
          width={60}
          wrapperStyle={{ margin: '0 auto', display: 'block' }}
          color="#fff"
          backgroundColor="#F4442E"
        />
      )}
    </div>
  );
};

export default Comments;
