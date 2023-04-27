export interface ICommentPost {
  blogId: string;
  author: string;
  comment: string;
  parentId?: string;
}

export interface ICommentOptions {
  blogId: string;
  parentId?: string;
  author?: any;
  _id?: any;
}
