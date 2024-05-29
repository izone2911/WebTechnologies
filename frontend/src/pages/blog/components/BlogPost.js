import React from 'react';
import LikeButton from './LikeButton';
import Comment from './Comment';

const BlogPost = ({ blog }) => {
  return (
    <div className="blog-post">
      <h2>{blog.title}</h2>
      <img src={blog.imageUrl} alt={blog.title} />
      <p>{blog.content}</p>
      <div className="like-button">
        <LikeButton blogId={blog.id} />
      </div>
      <div className="comment-section">
        <Comment blogId={blog.id} />
      </div>
    </div>
  );
};

export default BlogPost;
