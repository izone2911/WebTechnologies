import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LikeButton = ({data}) => {
  const {blogId, emailCurrentUser} = data;
  const [likes, setLikes] = useState(0);
  const [isLike, setIsLike] = useState(false);

  useEffect(()=>{
    axios.post(`http://localhost:4000/api/blog/${blogId}/numberlike`, {emailCurrentUser})
    .then(result =>{
      setIsLike(result.data.isLiked);
      setLikes(result.data.numberLike);
    })
    .catch(err => console.error(err));
  }, []);

  const handleLike = async () => {
    try {
      console.log("id: ");
      console.log(blogId);
      console.log(emailCurrentUser);
      const response = await axios.post(`http://localhost:4000/api/blog/${blogId}/like`, {emailCurrentUser});
      console.log(response);
      setIsLike(!response.data.isLiked);
      setLikes(response.data.numberLike);
      
    } catch (error) {
      console.error('Error when like blog', error);
    }
  };



  return (
    <div>
      {isLike? (
          <div style={{display: 'flex'}}>
            <button onClick={handleLike} style={{backgroundColor: "red"}}>
              Unlike 
            </button>
            <p style={{marginLeft: '10px', fontSize: '20px'}}>{likes}</p>
          </div>
        ): (
          <div style={{display: 'flex'}}>
            <button onClick={handleLike}>
              Like
            </button>
            <p style={{marginLeft: '10px', fontSize: '20px'}}>{likes}</p>
          </div>
        )
      }
    </div>
  );
};

export default LikeButton;
