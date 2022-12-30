import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { BlogInterface } from "../../../interfaces/blog";
import { Toast } from "@skbkontur/react-ui";
import { Fetcher } from "swr";

const Editor = dynamic(() => import("../../../component/Editor/Editor"), {
  ssr: false,
});

const fetcher: Fetcher<BlogInterface, string> = (...args) =>
  fetch(...args).then((res) => res.json());

const Write = () => {
  const [blog, setBlog] = useState<BlogInterface | null>(null);
  const router = useRouter();
  const { blogId } = router.query;

  const { data, error, isLoading } = useSWR(
    blogId ? `/api/blogs/${blogId}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setBlog(data);
    }
  }, [data]);

  console.log(error);

  return (
    <div className="container">
      <Editor blog={blog} />
    </div>
  );
};

export default Write;
