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
  console.log(blog);
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ";

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
