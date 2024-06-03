import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext.js";
import './HomeBlog.css'
import NewBlog from './NewBlog'

const HomeBlog = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [popup,setPopup] = useState(false)
  let data = {
    id:'',
    email:'',
    title:'',
    description:'',
    image:''
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:4000/api/blog/get', {});
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const clickWrite = () => {
    data = {...data,email:currentUser.email}
    setPopup(true)
  }

  return (
    <div className="container-2">
      {popup?<NewBlog data={data} close={()=>setPopup(false)} setList={setPosts} />:<></> }
      <div className="nav-scroller py-1 mb-3 border-bottom">
        <nav className="nav nav-underlines" style={{ display: 'flex', justifyContent: 'center',width:"200px" }}>
          {currentUser?.roleID === 2 ?
            <Link >
              <button onClick={()=>clickWrite()} className="btn btn-success">Write</button>
            </Link> : null}
        </nav>
      </div>
      {posts?.map((post) => (
        <div className="posts">
          <div className="all-card">
            <div className="post-img">
              <img src={post.image} className="" alt="..." style={{ display: "inline-block", width: "100%", }} />
            </div>
            <div style={{width:"5%"}}></div>
            <div className="post-title">
              <Link to={`/blog/post/${post.id}`}>
                <h4 style={{fontSize:"28px"}}>{post.title}</h4>
              </Link>
              <div style={{fontSize:"20px",width:"90%",height:"65%",wordWrap: "break-word", overflow:"hidden"}}>{post.description}</div>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  )
};

export default HomeBlog;
