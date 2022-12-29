import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { fetchAllBlogs, getBlogById } from "../../helpers/api-util";
import { BlogInterface } from "../../interfaces/blog";
import BlogDetail from "../../component/BlogDetail/BlogDetail";

interface BlogProps {
  blog: BlogInterface;
}

const Blog: NextPage<BlogProps> = ({ blog }) => {
  return (
    <div className="container">
      <BlogDetail blog={blog} />
    </div>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async (context) => {
  const blog = await getBlogById(context.params?.id as string);

  return {
    props: {
      blog,
    },
    // revalidate: 200,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogs: BlogInterface[] = await fetchAllBlogs();

  const blogIds = blogs.map((blog) => ({
    params: {
      id: blog._id,
    },
  }));

  return {
    paths: blogIds,
    fallback: "blocking",
  };
};
