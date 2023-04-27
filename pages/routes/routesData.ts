export type MethodsType = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const methodColors = {
  PUT: '#FCA130',
  GET: '#61AFFE',
  POST: '#49CC90',
  DELETE: '#F93E3E',
};

type RouteType = {
  path: string;
  description: string;
  method: MethodsType;
};

const routesData: RouteType[] = [
  {
    path: '/user/{userId}',
    description: 'Get user',
    method: 'GET',
  },
  {
    path: '/user/{userId}',
    description: 'Update user',
    method: 'PUT',
  },
  {
    path: '/blogs',
    description: 'Fetch all blogs',
    method: 'GET',
  },
  {
    path: '/blogs/{blogId}',
    description: 'Fetch single blog',
    method: 'GET',
  },
  {
    path: '/blogs',
    description: 'Create a new blog',
    method: 'POST',
  },
  {
    path: '/blogs/{blogId}',
    description: 'Update blog',
    method: 'PUT',
  },
  {
    path: '/blogs/{blogId}',
    description: 'Delete blog',
    method: 'DELETE',
  },
  {
    path: '/comments/{blogId}?parentId=',
    description: 'If query parameter exists, fetch child comments, otherwise parent comments',
    method: 'GET',
  },
  {
    path: '/comments/{blogId}?parentId=',
    description: 'Create a comment. If query parameter exists create as child, otherwise as parent',
    method: 'POST',
  },
  {
    path: '/comments/{blogId}?commentId=',
    description: 'Update comment',
    method: 'PUT',
  },
  {
    path: '/comments/{blogId}?commentId=',
    description: 'Delete comment',
    method: 'DELETE',
  },
  {
    path: '/comments/like/{commentId}?unlike=',
    description: 'Add user id to comment likes array',
    method: 'POST',
  },
  {
    path: '/comments/pin/{blogId}?commentId=',
    description: 'Pin comment',
    method: 'PUT',
  },
];

export default routesData;
