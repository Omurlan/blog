import React from "react";
import styles from "./BlogItem.module.css";
import { BlogInterface } from "../../interfaces/blog";

import { MdOutlineDateRange } from "react-icons/md";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { convertDate } from "../../helpers/date-util";
import { BiEditAlt } from "react-icons/bi";
import { Button } from "@skbkontur/react-ui";
import Link from "next/link";

dayjs.extend(calendar);

interface BlogItemProps {
  blog: BlogInterface;
}

const BlogItem = ({ blog }: BlogItemProps) => {
  // console.log(blog);

  return (
    <div className={styles.blog}>
      <div className={styles.header}>
        {/*<FaUserCircle />*/}
        <p className={styles.author}>{blog.author}</p>

        <div className={styles.date}>
          <time>{convertDate(blog.createdAt)}</time>
          <MdOutlineDateRange />
        </div>
      </div>

      <div className={styles.preview}>
        <Link href={`/blog/${blog._id}`}>
          <img src={blog.preview} alt={blog.title} />
        </Link>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.previewText}>{blog.previewText}</p>

        <div className={styles.actions}>
          <Link href={`/blog/edit/${blog._id}`}>
            <Button use="primary" className={styles.edit}>
              Редактировать
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
