import React from 'react';
import { useParams } from 'react-router-dom';
import BlogPost from './components/BlogPost.js';

function BlogPage(){
  const { id } = useParams();
  return (
    <div>
      <BlogPost blogId={id} />
    </div>
  );
};

export default BlogPage;
