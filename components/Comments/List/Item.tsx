import React, { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './Item.module.css';
import cn from 'classnames';
import {
  useAuthorLikeMutation,
  useLikeCommentMutation,
  usePinCommentMutation,
  useRemoveCommentMutation,
  useUnpinCommentMutation,
  useUpdateCommentMutation,
} from '@api/commentApi';
import { useTypedSelector } from '@redux-hook';
import { IComment } from '@interface/comment';
import { ICommentPost } from '../../../pages/api/comments/types';
import { FiEdit2 } from 'react-icons/fi';
import { UserHeader } from 'components/';
import { BsPin, BsTrash } from 'react-icons/bs';
import { TbPinnedOff } from 'react-icons/tb';
import { Options } from '@components/ui';
import AuthorLike from '../AuthorLike/AuthorLike';
import Like from '../Like/Like';
import { TailSpin } from 'react-loader-spinner';
import CommentForm from '../Form/Form';

interface CommentItemProps extends ComponentProps<'div'> {
  comment: IComment;
  pinned?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  pinned = false,
  className,
  ...props
}) => {
  const blog = useTypedSelector((state) => state.blog);

  const [replyText, setReplyText] = useState<string>('');
  const [reply, setReply] = useState<boolean>(false);

  const [likeComment] = useLikeCommentMutation();
  const [authorLike] = useAuthorLikeMutation();
  const [deleteComment, { isLoading }] = useRemoveCommentMutation();
  const [pinComment, {}] = usePinCommentMutation();
  const [unpinComment, {}] = useUnpinCommentMutation();
  const [updateComment, { isLoading: isUpdating, isSuccess }] = useUpdateCommentMutation();

  const { data: session, status } = useSession();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const submitReply = () => {
    const form: ICommentPost = {
      author: session?.user?.id!,
      blogId: comment.blogId,
      comment: replyText,
      parentId: comment._id,
    };

    setReply(false);
  };

  useEffect(() => {
    if (reply && textareaRef.current) {
      textareaRef.current?.scroll();
      textareaRef.current?.focus();
    }
  }, [reply, textareaRef.current]);

  const [active, setActive] = useState<boolean>(comment.likes?.includes(session?.user?.id!));
  const [authorLikeActive, setAuthorLikeActive] = useState<boolean>(!!comment.authorLike);
  const [count, setCount] = useState<number>(comment.likes.length);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [authorLikeInitialized, setAuthorLikeInitialized] = useState<boolean>(false);

  // optimistic like update
  const toggleLike = () => {
    setInitialized(true);
    setActive((prev) => !prev);
    setCount(active ? count - 1 : count + 1);
  };
  const toggleAuthorLike = useCallback(() => {
    setAuthorLikeInitialized(true);
    setAuthorLikeActive((prev) => !prev);
  }, [comment]);

  // bebounce like switching
  useEffect(() => {
    if (initialized) {
      const timer = setTimeout(handleLike, 1000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  // bebounce author like switching
  useEffect(() => {
    if (authorLikeInitialized) {
      const timer = setTimeout(handleAuthorLike, 1000);
      return () => clearTimeout(timer);
    }
  }, [authorLikeActive]);

  // like comment
  const handleLike = () => {
    likeComment({ commentId: comment._id, userId: session?.user?.id!, unlike: !active });
  };

  const handleAuthorLike = () => {
    authorLike({ commentId: comment._id, remove: !authorLikeActive });
  };

  const handlePinComment = () => {
    pinComment({ blogId: comment.blogId, commentId: comment._id });
  };

  const handleUnpinComment = () => unpinComment(comment.blogId);

  const handleRemoveComment = () =>
    deleteComment({ blogId: comment.blogId, commentId: comment._id, isPinned: pinned });

  const handleUpdateComment = (value: string) => {
    updateComment({ commentId: comment._id, comment: value });
  };

  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = () => setEdit(!edit);

  return (
    <div className={styles.item} {...props}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <UserHeader
          pinned={pinned}
          pinnedBy={blog.author.username}
          vertical
          isAuthor={comment.author._id === blog.author._id}
          user={comment.author}
          createdAt={comment.createdAt}
        />

        <Options className={styles.options}>
          {session?.user?.id === blog.author._id && (
            <Options.Option onClick={() => (pinned ? handleUnpinComment() : handlePinComment())}>
              {pinned ? <TbPinnedOff /> : <BsPin />}
              {pinned ? 'Открепить' : 'Закрепить'}
            </Options.Option>
          )}

          {session?.user?.id === comment.author._id && (
            <Options.Option onClick={handleEdit}>
              <FiEdit2 />
              Изменить
            </Options.Option>
          )}

          {(session?.user?.id === comment.author._id || session?.user?.id === blog.author._id) && (
            <Options.Option onClick={handleRemoveComment}>
              <BsTrash />
              Удалить
            </Options.Option>
          )}
        </Options>
      </div>

      <CommentForm
        toggleEdit={handleEdit}
        isLoading={isUpdating}
        isSuccess={isSuccess}
        submit={handleUpdateComment}
        blogId={comment.blogId}
        edit={edit}
        value={comment.comment}
      />
      {/* <p className={styles.comment}>{comment.comment}</p> */}

      <div className={styles.rateAndReply}>
        <Like toggleLike={toggleLike} count={count} active={active} />

        <AuthorLike
          canLike={session?.user?.id === blog.author._id}
          toggleAuthorLike={toggleAuthorLike}
          active={authorLikeActive}
        />

        <div className={styles.reply}>
          {/* <button onClick={handleOpenReply} className={cn(styles.button, styles.replyButton)}>
            Ответить
          </button> */}
        </div>

        {/* {comment.replies?.length && (
          <div className={styles.replies}>
            <button onClick={openReplies} className={cn(styles.button, styles.replyButton)}>
              Ответы {comment.replies.length}
            </button>
          </div>
        )} */}
      </div>

      {isLoading && (
        <TailSpin
          height={30}
          width={30}
          color="gray"
          wrapperStyle={{ margin: '0 auto', display: 'block' }}
        />
      )}

      {/* {reply && (
        <div className={styles.replyForm}>
          <TextareaAutosize
            ref={textareaRef}
            minRows={4}
            className={styles.replyInput}
            value={replyText}
            onChange={handleChangeReply}
            placeholder="Ваш ответ"
          />
          <div style={{ marginLeft: 'auto' }}>
            <button onClick={handleCloseReply} className={styles.button}>
              Отмена
            </button>
            <button onClick={submitReply} className={styles.button}>
              Отправить
            </button>
          </div>
        </div>
      )} */}

      {/* {comment?.replies?.length ? <CommentList comments={data || []} /> : ''} */}
    </div>
  );
};

// custom comparison trgger only on comment changes

export default React.memo(CommentItem);
