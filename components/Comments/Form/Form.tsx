import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Form.module.css';
import cn from 'classnames';
import { Spinner } from '@skbkontur/react-ui';
import TextareaAutosize from 'react-textarea-autosize';
import { Button, Direction } from '@components/ui';

interface CommentFormProps {
  blogId: string;
  commentId?: string;
  edit?: boolean;
  create?: boolean;
  value?: string;
  isLoading: boolean;
  isSuccess: boolean;
  submit: (value: string) => void;
  toggleEdit?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  toggleEdit,
  submit,
  isLoading,
  isSuccess,
  value = '',
  create = false,
  edit = false,
}) => {
  const [comment, setComment] = useState<string>(value || '');
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value);

  const handleSubmit = () => submit(comment);

  useEffect(() => {
    if (isSuccess && !edit) {
      setComment('');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!edit) setComment(value);
  }, [edit]);

  return (
    <div className={styles.form}>
      <div className={styles.avatarAndInput}>
        <TextareaAutosize
          readOnly={!create && !edit}
          value={comment}
          onChange={handleChange}
          className={cn(styles.input, styles.comment, {
            [styles.edit]: edit || create,
          })}
          placeholder="Ваш комментарий"
        />
      </div>
      {(edit || create) && (
        <Direction justify="end">
          <Button color="danger" onClick={toggleEdit} className={styles.button}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} className={styles.button}>
            {edit ? 'Сохранить комментарий' : 'Оставить комментарий'}
          </Button>
        </Direction>
      )}
      {isLoading && <Spinner caption="" />}
    </div>
  );
};

export default React.memo(CommentForm);
