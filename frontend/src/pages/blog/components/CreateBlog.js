import React, { useState } from 'react';

const CreateBlog = ({ onBlogCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    try {
      // const response = await api.post('/blogs', formData);
      // onBlogCreated(response.data);
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Blog</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button type="submit">Create Blog</button>
    </form>
  );
};

export default CreateBlog;
