import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Tilt from "react-parallax-tilt";
import axios from "axios"
import { AuthContext } from "../../context/authContext";

import './dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './dependencies/vendor/animate/animate.css';
import './dependencies/vendor/css-hamburgers/hamburgers.min.css';
import './dependencies/vendor/select2/select2.min.css';
import './dependencies/css/util.css';
import './dependencies/css/main.css';
import './styleDiv.css'

export const DashBoard = () => {
  return (
    <div className="dashboard">
        <div className="logo">
    
            <p>Group 18</p>
        </div>
        <div className="login">
            <Link to='/login'><button>Login</button></Link>
        </div>
    </div>

  )
}

export default DashBoard