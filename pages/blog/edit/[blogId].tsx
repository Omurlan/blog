import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { BlogInterface } from "../../../interfaces/blog";
import { Toast } from "@skbkontur/react-ui";

const Editor = dynamic(() => import("../../../component/Editor/Editor"), {
  ssr: false,
});

const Write = () => {
  const [blog, setBlog] = useState<BlogInterface | null>(null);
  const router = useRouter();
  const { blogId } = router.query;

  const getBlogById = async () => {
    const response = await fetch(`/api/blogs/${blogId}`);
    const data = await response.json();
    setBlog(data);
  };

  useEffect(() => {
    if (blogId) {
      getBlogById();
    }
  }, [blogId]);

  return (
    <div className="container">
      <Editor blog={blog} />
    </div>
  );
};

export default Write;
