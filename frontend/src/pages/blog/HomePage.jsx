import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";

import './dependencies/css/style.css';
import BlogList from "./components/BlogList.js";
import CreateBlog from './components/CreateBlog.js';
import { AuthContext } from "../../context/authContext.js";

function HomePage(){
    const {currentUser} = useContext(AuthContext);
    const [acc, setAcc] = useState(currentUser);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
            const response = await axios.post("http://localhost:4000/api/blog/getfeedblog", {email: acc.email})
            setBlogs(response.data);
            console.log(response);
            } catch (error) {
            console.error('Error fetching blogs', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleBlogCreated = (newBlog) => {
        setBlogs([newBlog, ...blogs]);
    };

    return (
    <div className="container3">
        <h1>Blog Forum</h1>
        <CreateBlog onBlogCreated={handleBlogCreated} /> 
        <BlogList blogs={blogs} />
    </div>
    );
};

export default HomePage;
