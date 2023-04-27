import { IAuthor } from './comment';

export enum BlockTypes {
  paragraph = 'paragraph',
  image = 'image',
  warning = 'warning',
  header = 'header',
}

type FileType = {
  url: string;
};

type BlockItemDataType = {
  text?: string;
  level?: number;
  file?: FileType;
  caption?: string;
  withBorder?: boolean;
  stretched?: boolean;
  withBackground?: boolean;
  message?: string;
};

type AnchorType = {
  anchor: string;
};

type TunesType = {
  anchorTune: AnchorType;
};

export type BlockItemType = {
  id: string;
  type: keyof typeof BlockTypes;
  data: BlockItemDataType;
  tunes?: TunesType;
};

export interface IBlogReq {
  title: string;
  previewImage: string;
  blocks: BlockItemType[];
  time: number;
}

export interface IBlog extends Omit<IBlogReq, 'author'> {
  _id: string;
  pinnedComment?: string;
  author: IAuthor;
  createdAt: string;
  updatedAt: string;
}
