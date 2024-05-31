import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ blogId }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = async () => {
    try {
      await axios.post(`http://localhost:4000/api/blog/${blogId}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error('Error when like blog', error);
    }
  };

  return (
    <button onClick={handleLike}>
      Like {likes}
    </button>
  );
};

export default LikeButton;
