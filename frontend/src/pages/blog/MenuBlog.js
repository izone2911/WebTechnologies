import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MenuBlog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/postBlog/blog`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div
        className="menu"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {posts?.map((post) => (
          <Link to={`/blog/post/${post.Id}`}
            className="post d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
            key={post.Id}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img style={{borderRadius: "6px", width: "100px"}} src={post?.img} alt="hero"></img>
            <h4>{post?.title}</h4>
            <br></br>
          {/* </div> */}
          </Link>
        ))}
      </div>
    </>
  );
};

export default MenuBlog;
