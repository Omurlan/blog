import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useLazyGetCommentsQuery } from '../../store/services/commentApi';

export const useComment = (blogId: string) => {
  const { status } = useSession();

  const [getComments, { isLoading }] = useLazyGetCommentsQuery();

  useEffect(() => {
    if (status !== 'loading') {
      getComments(blogId);
    }
  }, [blogId, status]);

  return { isLoading };
};
