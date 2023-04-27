export interface IAuthor {
  _id: string;
  username: string;
  avatar: string;
}

export interface IComment {
  _id: string;
  author: IAuthor;
  replies: string[];
  comment: string;
  edited: boolean;
  blogId: string;
  parentId: null | string;
  authorLike?: boolean;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}
