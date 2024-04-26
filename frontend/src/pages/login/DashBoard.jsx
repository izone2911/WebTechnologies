import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import Tilt from "react-parallax-tilt";
import axios from "axios"

import './dependencies/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './dependencies/vendor/animate/animate.css';
import './dependencies/vendor/css-hamburgers/hamburgers.min.css';
import './dependencies/vendor/select2/select2.min.css';
import './dependencies/css/util.css';
import './dependencies/css/main.css';
import './styleDiv.css'
import { AuthContext } from "../../context/authContext";

function AccountInformation() {
  const {currentUser} = useContext(AuthContext)
  const [profile, setProfile] = useState(currentUser);
  
  const handleChange = (e) => {
    setProfile({
      ...profile, 
      [e.target.name]: e.target.value
    })
  }
  console.log(profile);

  const handleSubmit = () => {
    fetch('http://localhost:4000/api/auth/update', {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    }).then((res) => res.json()).then(data => console.log(data))
  }

  return (
    <div>
      <div className="user-detail">
        <p>Thông tin tài khoản cơ bản</p>
        <p>Thiết lập thông tin</p>
        <p>Email đăng nhập</p>
        <input onChange={(handleChange)} value={profile.email} type="email" name="email" id="" />
        <p>Tên đầy đủ</p>
        <input onChange={handleChange} value={profile.fullname} type="text" name="fullname" id="" />
        <p>Vai trò</p>
        <input onChange={handleChange} value={profile.role} type="text" name="role" id="" />
      </div>
      <button onClick={handleSubmit}>Lưu thay đổi</button>
    </div>
  )
}

const DashBoard = () => {
  const [tab, setTab] = useState('account information');
  
  return (
    <div>
      <div className="dashboard">
        <div className="logo">
        </div>
        <div className="login">
            <Link to='/login'><button>Login</button></Link>
        </div>
      </div>

      <div className="body">
        <div>
          <p>Thiết lập tài khoản</p>
        </div>

       <div className="tabbar">
          <button 
            className={`${(tab === 'account information') && 'is-active-btn'}`}
            onClick={() => setTab('account information')}
          >
            Thông tin tài khoản
          </button>
          <button 
            className={`${(tab === 'related account') && 'is-active-btn'}`}
            onClick={() => setTab('related account')}
          >
            Những tài khoản liên kết
          </button>
          <button 
            className={`${(tab === 'transaction history') && 'is-active-btn'}`}
            onClick={() => setTab('transaction history')}
          >
            Lịch sử giao dịch
          </button>
       </div>

        {(tab === 'account information') && <AccountInformation />}
      </div>
    </div>
  )
}

export default DashBoard