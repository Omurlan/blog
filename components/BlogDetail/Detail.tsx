import React from 'react';
import styles from './Detail.module.css';
import { IBlog } from '@interface/blog';
import Card from '../ui/Card/Card';
import Header from './Header/Header';
import { parseEditor } from '@helpers/parser';

interface BlogDetailProps {
  blog: IBlog;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  return (
    <div className={styles.detail}>
      <Header blog={blog} className={styles.header} />

      <div className={styles.body}>
        <div className={styles.content}>
          {blog.blocks.map((block) => {
            return parseEditor(block);
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
