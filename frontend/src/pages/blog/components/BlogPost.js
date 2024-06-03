import {React} from 'react';
import { useContext } from 'react';
import LikeButton from './LikeButton';
import Comment from './Comment';
import { AuthContext } from "../../../context/authContext.js";

const BlogPost = ({ blog }) => {
  const { currentUser} = useContext(AuthContext);
  const data = {blogId: blog._id, emailCurrentUser: currentUser.email, avatarCurrentUser: currentUser.avatar}

  return (
    <div className="blog-post">
      <div className='post-user' style={{display: 'flex'}}>
        <img src={blog.userAvatar} alt="" style={{height: "30px", width: "auto"}} />
        <p style={{fontSize: "20px", marginLeft: "10px"}}><b>{blog.userName}</b></p>
      </div>
      <h2>{blog.title}</h2>
      <p>{blog.description}</p>
      {blog.picturePath !== null ? (<img src={blog.picturePath} alt={blog.title} />): null}
      <div className="like-button">
        <LikeButton data={data} />
      </div>
      <div className="comment-section">
        <Comment data={data} />
      </div>
    </div>
  );
};

export default BlogPost;
