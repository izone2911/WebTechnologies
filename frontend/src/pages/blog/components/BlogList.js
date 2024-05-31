import React from 'react';
import BlogPost from './BlogPost';

const BlogList = ({ blogs }) => {
  return (
    <div className="blog-list">
      {blogs.map(blog => (
        <BlogPost key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;

