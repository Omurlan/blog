import React from "react";
import { GetStaticProps } from "next";
import Blog from "../models/Blog";
import { BlogInterface } from "../interfaces/blog";
import BlogList from "../component/Blog/BlogList";
import { fetchAllBlogs } from "../helpers/api-util";

interface BlogsProps {
  blogs: BlogInterface[];
}

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="container">
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps = async () => {
  const blogs: BlogInterface[] = await fetchAllBlogs();

  return {
    props: { blogs },
    revalidate: 100,
  };
};
