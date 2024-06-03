import React, { useState } from 'react';
import axios from 'axios';

const Comment = ({data}) => {
  const {blogId, emailCurrentUser, avatarCurrentUser} = data;
  const [likes, setLikes] = useState(0);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [contentButton, setContentButton] = useState('Show comment');

  const setDisplayComment = ()=>{
    setShowComment(!showComment);
    if(showComment)   setContentButton('Show comment');
    else  setContentButton('Hide comment');
    fetchComments();
  }

  const fetchComments = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/blog/comment/${blogId}/getcomment`, {emailCurrentUser});
      if(comments !== null && comments !== undefined)   setComments([...response.data]);
      console.log("Get comment");
      console.log(response.data[0]);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newComment);
      const response = await axios.post(`http://localhost:4000/api/blog/comment/${blogId}/addcomment`, {emailCurrentUser, comment: newComment});
      console.log("Add comment");
      console.log(response.data);

      // fetchComments();
      setComments([...comments, newComment]);
      setNewComment({
        emailUser: emailCurrentUser,
        avatar: null,
        content: ''
      });
    } catch (error) {
      console.error('Error posting comment', error);
    }
  };

  return (

    <div>
      <button onClick={setDisplayComment}>{contentButton}</button>
      {showComment ? (
        <div>
          <div>
        {comments.map((comment, index) => (
          <div id={index} className='comment'>
            <div style={{display: 'flex'}}>
              <img src={comment.avatar} style={{height: '20px', width: 'auto'}} alt=""/>
              <b><p>{comment.emailUser}</p></b>
            </div>
            {comment.content}
          </div>
        ))}
          </div>

          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={newComment.content}
              onChange={(e) => setNewComment(
                {
                  emailUser: emailCurrentUser,
                  avatar: avatarCurrentUser,
                  content: e.target.value
                })}
              placeholder="Add a comment"
              required
            />
            <button type="submit">Comment</button>
          </form>
        </div>
      ): null}
    </div>
  );
};

export default Comment;
