import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@libs/firebase';
import { v4 } from 'uuid';
import { compressImage } from '@helpers/compress';
import Warning from 'components/editorjs/Warning/Warning';
import Header from 'components/editorjs/Header/Header';
import ImageTool from 'components/editorjs/ImageTool/ImageTool';
import Anchor from 'components/editorjs/Anchor/Anchor';
import Embed from 'components/editorjs/Embed/Embed';
import LinkTool from 'components/editorjs/Link/Link';
import { ToolConstructable, ToolSettings as ToolSetting } from '@editorjs/editorjs';

interface ToolSettings extends Omit<ToolSetting, 'class'> {
  class: any;
}

type ToolType = {
  [key: string]: ToolConstructable | ToolSettings;
};

export const EDITOR_TOOLS: ToolType = {
  header: {
    class: Header,
    config: {
      placeholder: 'Заголовок',
      defaultLevel: 3,
    },
  },
  anchorTune: Anchor,
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      messagePlaceholder: 'Сообщение',
    },
  },
  list: {
    class: List,
    inlineToolbar: ['link', 'bold'],
  },
  delimiter: Delimiter,
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: '/api/openGraph',
    },
  },
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        coub: true,
      },
    },
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile(file: File) {
          return new Promise(async (resolve, reject) => {
            const imageRef = ref(storage, `blogs/${file.name + v4()}`);
            const compressedImage = await compressImage(file);

            uploadBytes(imageRef, compressedImage)
              .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                  .then((url) => {
                    resolve({
                      success: 1,
                      file: {
                        url,
                      },
                    });
                  })
                  .catch((error) => {
                    reject(error);
                  });
              })
              .catch((error) => {
                reject(error);
              });
          });
        },
      },
    },
  },
  quote: Quote,
};

export const i18n = {
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          'Click to tune': 'Настроить',
        },
      },
      inlineToolbar: {
        converter: {
          'Convert to': 'Поменять на',
        },
      },
      toolbar: {
        toolbox: {
          Add: 'Добавить',
        },
      },
      popover: {
        Filter: 'Поиск',
        'Nothing found': 'Не найдено',
      },
    },

    toolNames: {
      Bold: 'Жирный',
      Italic: 'Курсив',
      Text: 'Параграф',
      Heading: 'Заголовок',
      List: 'Список',
      Delimiter: 'Разделитель',
      Warning: 'Примечание',
      Link: 'Вставка',
      Embed: 'Вставка',
      Image: 'Изображение',
      Quote: 'Цитата',
    },

    tools: {
      image: {
        Caption: 'Описание',
        'Select an Image': 'Выберите изображение',
      },
      embed: {
        'Enter a caption': 'Описание',
      },
      link: {
        'Add a link': 'Вставьте ссылку',
      },
      list: {
        Unordered: 'Маркированный',
        Ordered: 'Нумерованнй',
      },
    },

    blockTunes: {
      anchorTune: {
        Anchor: 'Якорь',
      },
      unordered: {
        Unordered: 'Ненумерованный',
      },

      delete: {
        Delete: 'Удалить',
        'Click to delete': 'Подтвердите',
      },
      moveUp: {
        'Move up': 'Сдвинуть вверх',
      },
      moveDown: {
        'Move down': 'Сдвинуть вниз',
      },
    },
  },
};
