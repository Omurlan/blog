import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IBlog } from '@interface/blog';
import { fetchBlogIds, getBlogById } from '@utils/staticPropsApi';
import { useAppDispatch } from '@redux-hook';
import { setBlog } from '@slices/blogSlice';
import { withLayout } from '@layout/layout';
import { BlogDetail, Comments } from 'components';
import { Direction } from '@components/ui';

interface BlogProps {
  blog: IBlog;
}

const Blog: NextPage<BlogProps> = ({ blog }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBlog(blog));
  }, []);

  return (
    <div className="container">
      <Direction column>
        <BlogDetail blog={blog} />
        <Comments blog={blog} />
      </Direction>
    </div>
  );
};

export default withLayout(Blog);

export const getStaticProps: GetStaticProps = async (context) => {
  console.log('paths');
  const blogId = context.params?.blogId as string;

  const blog = await getBlogById(blogId);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('paths');
  const blogIds: Pick<IBlog, '_id'>[] = await fetchBlogIds();

  const context = blogIds.map((blog) => ({
    params: {
      blogId: blog._id,
    },
  }));

  return {
    paths: context,
    fallback: 'blocking',
  };
};
