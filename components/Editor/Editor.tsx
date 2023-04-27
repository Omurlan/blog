import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './Editor.module.css';
import cn from 'classnames';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjsToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TextareaAutosize from 'react-textarea-autosize';
import ColorPicker from './CustomToolbar/ColorPicker';
import { Button, Input, Loader, Toast } from '@skbkontur/react-ui';
import { Editor } from 'react-draft-wysiwyg';
import { AiOutlineLink } from 'react-icons/ai';
import { IBlog } from '@interface/blog';
import { Card } from '@components/ui';

interface BlogEditorProps {
  blog?: IBlog | null;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blog }) => {
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [title, setTitle] = useState<string>('');
  const [preview, setPreview] = useState<string>('');
  const [previewText, setPreviewText] = useState<string>('');
  // const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: user } = useSession();

  useEffect(() => {
    if (blog && blog !== null) {
      // console.log(blogs);
      const blocksFromHtml = htmlToDraft(blog.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

      setEditorState(EditorState.createWithContent(contentState));
      setTitle(blog.title);
      setPreview(blog.preview);
      // setAuthor(blog.author);
      setPreviewText(blog.previewText);
    }
  }, [blog]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => setTitle(e.target.value);

  const handleChangePreviewText = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setPreviewText(e.target.value);

  // const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value);

  const handleChangePreview = (e: ChangeEvent<HTMLInputElement>) => setPreview(e.target.value);

  const submit = async () => {
    setLoading(true);

    const form = {
      title,
      content: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      author: user?.user?.id,
      preview,
      previewText,
    };

    try {
      await fetch(blog && blog !== null ? `/api/blogs/${blog._id}` : '/api/blogs', {
        method: blog && blog !== null ? 'PUT' : 'POST',
        body: JSON.stringify(form),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      showNotification('Пост сохранен!');
    } catch (error) {
      showNotification('Произоошла ошибка..');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (text: string) => {
    Toast.push(text, {
      label: 'Закрыть',
      handler: () => Toast.push('Canceled'),
    });
  };

  return (
    <Loader active={loading}>
      <Card>
        <div className={styles.editor}>
          <input
            value={preview}
            onChange={handleChangePreview}
            className={cn(styles.input, styles.url)}
            placeholder="Изображение для превью (только URL)"
          />

          {/*{preview && <img style={{ maxWidth: 300 }} src={preview} />}*/}

          <TextareaAutosize
            value={title}
            minRows={1}
            maxLength={130}
            onChange={handleChangeTitle}
            className={cn(styles.textarea, styles.title)}
            placeholder="Заголовок (макс. символов 120)"
          />

          <TextareaAutosize
            value={previewText}
            minRows={1}
            onChange={handleChangePreviewText}
            className={cn(styles.textarea, styles.previewText)}
            minLength={100}
            maxLength={300}
            placeholder="Небольшое описание поста (мин. символов 200, макс. символов 400)"
          />

          <Editor
            // toolbarOnFocus
            localization={{
              locale: 'ru',
            }}
            placeholder="Можете начинать..."
            editorClassName="edit"
            toolbar={{
              options: [
                // "inline",
                'blockType',
                // "fontSize",
                // "fontFamily",
                'list',
                // "textAlign",
                // "colorPicker",
                'link',
                // "embedded",
                // "emoji",
                'image',
                // "remove",
                // "history",
              ],
              colorPicker: {
                component: ColorPicker,
              },

              blockType: {
                className: styles.customOption,
                dropdownClassName: styles.customDropdown,
              },
              link: {
                link: {
                  className: styles.customOption2,
                },
              },
              image: {
                className: styles.customOption2,
                popupClassName: 'demo-popup-custom',
              },
              list: {
                unordered: { className: styles.customOption2 },
                ordered: { className: styles.customOption2 },
              },
              fontFamily: {
                options: ['inherit'],
              },
            }}
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />

          <Button onClick={submit} className={styles.publish} use="primary" arrow>
            {blog ? 'Сохранить' : 'Опубликовать'}
          </Button>
        </div>
      </Card>
    </Loader>
  );
};

export default BlogEditor;
