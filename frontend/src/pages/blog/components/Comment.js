import React, { useState } from 'react';
import axios from 'axios';

const Comment = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/blogs/${blogId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/blogs/${blogId}/comments`, { content: newComment });
      fetchComments();
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Comment</button>
      </form>
      <div>
        {comments.map(comment => (
          <div key={comment.id}>{comment.content}</div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
