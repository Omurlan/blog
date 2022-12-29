import React from "react";
import styles from "./BlogDetail.module.css";
import { BlogInterface } from "../../interfaces/blog";
import { convertDate } from "../../helpers/date-util";

interface BlogDetailProps {
  blog: BlogInterface;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  console.log("");

  return (
    <div className={styles.detail}>
      <div className={styles.header}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div className={styles.preview}>
            <img src={blog.preview} alt="Preview" />
            <h1 className={styles.title}>{blog.title}</h1>
          </div>
          <img className={styles.blurImage} src={blog.preview} alt="Preview" />
        </div>
        <div className={styles.author}>
          <time>{convertDate(blog.createdAt)}</time>
          <p>{blog.author}</p>
        </div>
      </div>

      <div className={styles.body}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>
      </div>
    </div>
  );
};

export default BlogDetail;
