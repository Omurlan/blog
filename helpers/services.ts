import useSWR from 'swr';
import { IComment } from '../global/interfaces/comment';
import { fetcher } from './swr-fetcher';

export const useComment = (blogId: string) => {
  const { data, isLoading, error, mutate } = useSWR<IComment[]>(
    `/api/comments?blogId=${blogId}`,
    fetcher
  );

  return {
    comments: data,
    mutate,
    isLoading,
    isError: error,
  };
};
