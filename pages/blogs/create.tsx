import React from 'react';
import { withLayout } from '@layout/layout';
import dynamic from 'next/dynamic';

const EditorNew = dynamic(() => import('components/Editor/EditorNew'), {
  ssr: false,
});

const Write = () => {
  return <EditorNew />;
};

export default withLayout(Write);
