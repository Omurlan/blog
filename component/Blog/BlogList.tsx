import React from "react";
import styles from "./BlogList.module.css";
import cn from "classnames";
import { BlogInterface } from "../../interfaces/blog";
import BlogItem from "./BlogItem";

interface BlogListProps {
  blogs: BlogInterface[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <div className={styles.blogs}>
      {blogs.map((blog) => (
        <BlogItem key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
