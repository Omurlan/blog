import React from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../component/Editor/Editor"), {
  ssr: false,
});

const Write = () => {
  return (
    <div className="container">
      <Editor />
    </div>
  );
};

export default Write;
