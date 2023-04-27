import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { IBlog } from '@interface/blog';
import { fetcher } from '@helpers/swr-fetcher';
import useSWR from 'swr';
import { withLayout } from '@layout/layout';

const Editor = dynamic(() => import('components/Editor/Editor'), {
  ssr: false,
});

const Write = () => {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const router = useRouter();
  const { blogId } = router.query;

  const { data, error, isLoading } = useSWR(blogId ? `/api/blogs/${blogId}` : null, fetcher);

  useEffect(() => {
    if (data) {
      setBlog(data);
    }
  }, [data]);

  return (
    <div className="container">
      <Editor blog={blog} />
    </div>
  );
};

export default withLayout(Write);
