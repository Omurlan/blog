import { GetStaticProps, NextPage } from 'next';
import { IBlog } from '@interface/blog';
import { fetchBlogs } from '@utils/staticPropsApi';
import { withLayout } from '@layout/layout';
import { BlogList } from 'components';

interface BlogsProps {
  blogs: IBlog[];
}

const Blogs: NextPage<BlogsProps> = ({ blogs }) => {
  return (
    <div className="container">
      <BlogList blogs={blogs} />
    </div>
  );
};

export default withLayout(Blogs);

export const getStaticProps: GetStaticProps = async () => {
  const blogs: IBlog[] = await fetchBlogs();

  return {
    props: { blogs },
  };
};
