import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './EditorNew.module.css';
import cn from 'classnames';
import { createReactEditorJS } from 'react-editor-js';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_TOOLS, i18n } from './tools';
import TextAreaAutosize from 'react-textarea-autosize';
import { Button } from '@components/ui';
import { useCreatePostMutation } from '@api/blogApi';
import { BlockItemType } from '@interface/blog';
import DragDrop from 'editorjs-drag-drop';

const ReactEditorJS = createReactEditorJS();

const savedData: OutputData | null = localStorage.getItem('draft')
  ? JSON.parse(localStorage.getItem('draft') as string)
  : null;

const savedTitle = localStorage.getItem('title') || '';

const EditorNew: React.FC<{ authorId: string }> = ({ authorId }) => {
  const [title, setTitle] = useState<string>(savedTitle);
  const [draft, setDraft] = useState<OutputData | null>(savedData);
  const [previewImage, setPreviewImage] = useState<string>(
    'https://softech.kg/image/catalog/Products/Phones/Poco/X5%20Pro/1a.jpg'
  );

  const editorRef = useRef<EditorJS | null>(null);

  console.log(savedData);

  const handleReady = () => {
    new DragDrop(editorRef.current);
  };

  const [createPost, { data, isLoading, isError, error }] = useCreatePostMutation();

  const handleGoToEditor = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      editorRef.current?.focus();
    }
  };

  const handleInitialize = useCallback(({ _editorJS }: { _editorJS: EditorJS }) => {
    editorRef.current = _editorJS;
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    editorRef.current?.save().then((outputData) => {
      localStorage.setItem('draft', JSON.stringify(outputData));
      localStorage.setItem('title', title);
    });
  };

  const handleSubmit = () => {
    if (draft) {
      createPost({
        title,
        previewImage,
        blocks: draft.blocks as BlockItemType[],
        time: draft.time || 0,
      });
    }
  };

  useEffect(() => {
    document.body.style.background = 'white';

    return () => {
      document.body.style.background = 'var(--background-color)';
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className="container">
        <TextAreaAutosize
          value={title}
          onChange={handleChange}
          onKeyDown={handleGoToEditor}
          className={cn(styles.title, 'title')}
          placeholder="Заголовок"
        />
      </div>

      <ReactEditorJS
        onInitialize={handleInitialize}
        onReady={handleReady}
        holder="blog"
        placeholder="Начните рассказ"
        i18n={i18n}
        defaultValue={savedData || { blocks: [] }}
        tools={EDITOR_TOOLS}
        tunes={['anchorTune']}
      >
        <div id="blog" className={styles.editor}></div>
      </ReactEditorJS>

      <div className="container">
        <Button onClick={handleSave}>Сохранить</Button>
        <Button onClick={handleSubmit}>Подтвердить</Button>
      </div>
    </div>
  );
};

export default EditorNew;
