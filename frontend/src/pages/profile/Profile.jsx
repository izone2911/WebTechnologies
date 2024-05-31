import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";
import {FaEye, FaEyeSlash} from "react-icons/fa";

import './dependencies/css/style.css';
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  
    // Get account
    const { currentUser, logout } = useContext(AuthContext);
    // console.log(currentUser);

    const [profile, setProfile] = useState(currentUser);

    const [editMode, setEditMode] = useState(false);

    const [tempProfile, setTempProfile] = useState({ ...profile });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [warning, setWarning] = useState(false);

    const [warningMessage, setWarningMessage] = useState();

  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setTempProfile({ ...tempProfile, [name]: value });
    };
  
    const handleSave = () => { 
      console.log("temp");
      console.log(tempProfile);
      if(tempProfile.password !== tempProfile.retype_password && editPassword == true){
        setWarning(true);
        setWarningMessage("Nhập lại mật khẩu sai!")
      }  
      else{
        setProfile({ ...tempProfile });
        setEditMode(false);
        console.log("Current in4 : ");
        console.log(tempProfile);

        // Lưu thông tin vào server nếu cần thiết
        axios.post('http://localhost:4000/api/auth/updateaccount', {acc: tempProfile})
             .then(response => console.log(response.data))
             .catch(error => console.log(error));
      }
    };
    
    const navigate = useNavigate();
    const handleLogOut = () => {
      console.log("Log out");
      logout();
      navigate('/dashboard');
    }

    const enableEditPassword = () =>{
        setEditPassword(true);
    }

    // set avatar
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTempProfile({ ...tempProfile, avatar: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
  
    return (
      <div className="profile-container">
        <img src={tempProfile.avatar} alt="Avatar" className="profile-image" 
        onClick={() => document.getElementById('avatarInput').click()
        
        }/>
        <input type="file"
          id="avatarInput"
          style={{display: 'none'}}
          onChange={handleAvatarChange}
        />
        
        {editMode ? (
          <div className="infor">
            <label htmlFor="name">Họ và tên</label>
            <input
              type="text"
              name="name"
              defaultValue={tempProfile.name}
              onChange={handleInputChange}
              className="input"
              placeholder="Họ và tên"
            />

            <label htmlFor="role">Vai trò</label>
            <input
              type="text"
              name="role"
              defaultValue={tempProfile.role}
              className="input"
              readOnly
            />

            <label htmlFor="email">Email</label> 
            <input
              type="email"
              name="email"
              defaultValue={tempProfile.email}
              className="input"
              readOnly
            />

            <label htmlFor="phone">SĐT</label>
            <input
              type="tel"
              name="phone"
              onChange={handleInputChange}
              defaultValue={tempProfile.phone}
              className="input"
            />

            <label htmlFor="birthDay">Ngày sinh</label>
            <input
              type="date"
              name="birthDay"
              onChange={handleInputChange}
              defaultValue={tempProfile.birthDay}
              className="input"
            />

          <label htmlFor="gender">Giới tính</label>
          <select
            name="gender"
            value={tempProfile.gender}
            onChange={handleInputChange}
            className="input"
          >
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>

            <label htmlFor="password">Mật khẩu</label>
            {!editPassword ? (
                <button className="setting-button" onClick={enableEditPassword}>Sửa mật khẩu</button>
            ) : (
                <div className="password-container">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    defaultValue={tempProfile.password}
                    onChange={handleInputChange}
                    className="input password-input"
                    placeholder="Mật khẩu"
                    />

                    <span
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>

                    <label htmlFor="retype-password">Nhập lại mật khẩu</label>
                    <input
                    type={showRetypePassword ? 'text' : 'password'}
                    name="retype_password"
                    defaultValue={tempProfile.password}
                    onChange={handleInputChange}
                    className="input password-input"
                    placeholder="Nhập lại mật khẩu"
                    />

                    <span
                    className="password-toggle"
                    onClick={() => setShowRetypePassword(!showRetypePassword)}
                    >
                    {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
            )}

            <div className="choice-button">
              <button onClick={handleSave} className="btn btn-success">Save</button>
              <button onClick={()=>setEditMode(false)} className="btn btn-danger">Cancel</button>
              <button onClick={handleLogOut} className="btn btn-danger">Log out</button>
            </div>

            {warning ? (<p style={{color: "red"}}>{warningMessage}</p>) : (null)}
          </div>
        ) : (
          <>
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
            <button onClick={() => setEditMode(true)} className="button-setting">Edit Profile</button>
          </>
        )}
      </div>
    );
  };
  
  export default Profile;
