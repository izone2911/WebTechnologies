import React from 'react';
import LikeButton from './LikeButton';
import Comment from './Comment';

const BlogPost = ({ blog }) => {
  return (
    <div className="blog-post">
      <h2>{blog.title}</h2>
      <img src={blog.picturePath} alt={blog.title} />
      <p>{blog.description}</p>
      <div className="like-button">
        <LikeButton blogId={blog._id} />
      </div>
      <div className="comment-section">
        <Comment blogId={blog._id} />
      </div>
    </div>
  );
};

export default BlogPost;
