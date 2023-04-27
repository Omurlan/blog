import { IComment } from '../../global/interfaces/comment';

export interface IPinReq {
  blogId: string;
  commentId: string;
}

export interface IPinRes {
  message: string;
}

export interface ICommentReq {
  blogId: string;
  commentId: string;
}

export interface IUpdateReq {
  commentId: string;
  comment: string;
}

export interface IDeleteRes {
  success: boolean;
  message: string;
}

export interface IDeleteReq {
  blogId: string;
  commentId: string;
  isPinned: boolean;
}

export interface IDeletePinReq extends IDeleteReq {
  pinId: string;
}
