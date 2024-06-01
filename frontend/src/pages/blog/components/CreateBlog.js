import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authContext.js";

const CreateBlog = ({ onBlogCreated }) => {
  const {currentUser} = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: currentUser.email,
      title,
      description,
      picturePath: image
    }

    try {
      console.log("Create  ---");
      console.log(formData);
      const response = await axios.post('http://localhost:4000/api/blog/createblog', {data: formData});
      console.log(response);
      onBlogCreated(response.data);
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };

  return (
    <div >
      <form onSubmit={handleSubmit} className="create-post-container">
        <h3>Create a New Blog</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        {/* <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          // required
        /> */}
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image url"
          // required
        />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
