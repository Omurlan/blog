import { BlockItemType } from '@interface/blog';

export const parseEditor = (block: BlockItemType) => {
  const { type, data, tunes } = block;
  const { caption, file, level, message, stretched, text, withBackground, withBorder } = data;

  const anchorId: any = {};

  if (tunes?.anchorTune) {
    anchorId.id = tunes.anchorTune.anchor;
  }

  switch (type) {
    case 'header': {
      return (
        <h3 {...anchorId} className="blog__header" dangerouslySetInnerHTML={{ __html: text! }} />
      );
    }
    case 'image': {
      return (
        <div {...anchorId} className="image-block">
          <div className="image-block__image">
            <img className="image-block__image-picture" src={file?.url} />
          </div>

          {caption && (
            <p className="image-block__caption" dangerouslySetInnerHTML={{ __html: caption }} />
          )}
        </div>
      );
    }
    case 'paragraph': {
      return (
        <p {...anchorId} className="blog__paragraph" dangerouslySetInnerHTML={{ __html: text! }} />
      );
    }
    case 'warning': {
      return (
        <div {...anchorId} className="blog__warning">
          <div
            className="blog__warning-message"
            dangerouslySetInnerHTML={{ __html: message! }}
          ></div>
        </div>
      );
    }
  }
};
