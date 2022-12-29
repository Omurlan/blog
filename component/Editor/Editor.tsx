import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./Editor.module.css";
import { Button, Input, Loader, Toast } from "@skbkontur/react-ui";
import { Editor } from "react-draft-wysiwyg";
import cn from "classnames";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { BlogInterface } from "../../interfaces/blog";
import { AiOutlineLink } from "react-icons/ai";
import TextareaAutosize from "react-textarea-autosize";
import htmlToDraft from "html-to-draftjs";
import ColorPicker from "./CustomToolbar/ColorPicker";

interface BlogEditorProps {
  blog?: BlogInterface | null;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blog }) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const [previewText, setPreviewText] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (blog && blog !== null) {
      console.log(blog);
      const blocksFromHtml = htmlToDraft(blog.content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );

      setEditorState(EditorState.createWithContent(contentState));
      setTitle(blog.title);
      setPreview(blog.preview);
      setAuthor(blog.author);
      setPreviewText(blog.previewText);
    }
  }, [blog]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setTitle(e.target.value);

  const handleChangePreviewText = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setPreviewText(e.target.value);

  const handleChangeAuthor = (e: ChangeEvent<HTMLInputElement>) =>
    setAuthor(e.target.value);

  const handleChangePreview = (e: ChangeEvent<HTMLInputElement>) =>
    setPreview(e.target.value);

  const submit = async () => {
    setLoading(true);

    const form = {
      title,
      content: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      author,
      preview,
      previewText,
    };

    try {
      await fetch(
        blog && blog !== null ? `/api/blogs/${blog._id}` : "/api/blogs",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showNotification("Пост сохранен!");
    } catch (error) {
      showNotification("Произоошла ошибка..");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (text: string) => {
    Toast.push(text, {
      label: "Закрыть",
      handler: () => Toast.push("Canceled"),
    });
  };

  return (
    <Loader active={loading}>
      <div className={styles.editor}>
        {/*  <input*/}
        {/*    value={preview}*/}
        {/*    onChange={handleChangePreview}*/}
        {/*    className={cn(styles.input, styles.url)}*/}
        {/*    placeholder="Изображение для превью (только URL)"*/}
        {/*  />*/}

        {/*{preview && <img style={{ maxWidth: 300 }} src={preview} />}*/}

        <TextareaAutosize
          value={title}
          minRows={2}
          maxRows={5}
          maxLength={120}
          onChange={handleChangeTitle}
          className={cn(styles.input, styles.textarea, styles.title)}
          placeholder="Заголовок (макс. символов 120)"
        />

        <textarea
          value={previewText}
          onChange={handleChangePreviewText}
          className={cn(styles.textarea, styles.previewText)}
          minLength={100}
          maxLength={300}
          placeholder="Небольшое описание поста (мин. символов 200, макс. символов 400)"
        />

        <input
          value={author}
          onChange={handleChangeAuthor}
          placeholder="Автор"
          className={styles.input}
        />

        <Editor
          // toolbarOnFocus
          localization={{
            locale: "ru",
          }}
          placeholder="Можете начинать..."
          editorClassName="edit"
          toolbar={{
            options: [
              // "inline",
              "blockType",
              // "fontSize",
              // "fontFamily",
              "list",
              // "textAlign",
              // "colorPicker",
              "link",
              // "embedded",
              // "emoji",
              "image",
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
              popupClassName: "demo-popup-custom",
            },
            list: {
              unordered: { className: styles.customOption2 },
              ordered: { className: styles.customOption2 },
            },
            fontFamily: {
              options: ["inherit"],
            },
          }}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />

        <Button onClick={submit} className={styles.publish} use="primary" arrow>
          {blog ? "Сохранить" : "Опубликовать"}
        </Button>
      </div>
    </Loader>
  );
};

export default BlogEditor;
