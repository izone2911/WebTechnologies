import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext.js";
import './SingleBlog.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WriteBlog from './WriteBlog'
const SingleBlog = () => {
  const [post, setPost] = useState([]);
  const [popup,setPopup] = useState(false)
  const location = useLocation();
  const postId = location.pathname.split("/")[3].replace(/%20/g, " ");
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          'http://localhost:4000/api/blog/get',{id:postId})
        setPost(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    if(!window.confirm("Bài viết sẽ bị xóa vĩnh viễn?"))
      return ;
    try {
      await axios.post('http://localhost:4000/api/blog/delete',{id:postId});
    } catch (error) {
      console.log(error);
    }
    navigate("/blog/homepage");
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="container-1">
      
      <div className="div-image">
        <img src={post.image} alt="..." style={{ display: "inline-block", width: "100%", }} />
      </div>

      <div className="div-author">
        <div style={{height:"50px"}}></div>
        <div className="div-avatar">
          <img src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png" alt="..." style={{ display: "inline-block", width: "100%" }} />
        </div>
        <div style={{width:"20px"}}></div>
        <div className="name-author">
          <div className="email-author">
            Email: {post.email}
          </div>
          <div className="time-create">
            Post at: {post.createAt}
          </div>
        </div>
        {currentUser.email === post.email ?
        <div style={{width:"200px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
          <EditIcon onClick={()=>setPopup(true)} className="EditIcon"/>
          <DeleteIcon onClick={()=>handleDelete()}  className="DeleteIcon"/>
        </div>:null}

      </div>

      <div className="div-content">
        <div className="div-title">
          {post.title}
        </div>
      </div>
      <div className="div-description">
        {post.description}
      </div>
    {popup?<WriteBlog data={post} close={()=>setPopup(false)} setList={setPost}/>:<></>}
    </div>
  );
};

export default SingleBlog;
