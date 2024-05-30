import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState , useEffect} from "react";
import axios from "axios";
import {FaEye, FaEyeSlash} from "react-icons/fa";

import './dependencies/css/style.css';
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  
    // Get account
    // const { currentUser } = useContext(AuthContext);
    // const currentUser = {
    //   name: 'Nguyen Van A',
    //   role: 'Học sinh',
    //   email: 'huydz@gmail.com',
    //   password: '123abcdef',  
    //   avatar: 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
    // }
    // console.log(currentUser);

    const [profile, setProfile] = useState({
      name: 'Nguyen Van A',
      role: 'Học sinh',
      email: 'huydz@gmail.com',
      password: '123abcdef',  
      avatar: 'https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png',
    });

    const [tempProfile, setTempProfile] = useState({ ...profile });
    console.log("prf : ");
    console.log(tempProfile);
  
    const [editMode, setEditMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRetypePassword, setShowRetypePassword] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [warning, setWarning] = useState(false);

    const [warningMessage, setWarningMessage] = useState();

  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      console.log("Stellar");
      console.log(name);
      console.log(value);
      setTempProfile({ ...tempProfile, [name]: value });
    };
  
    const handleSave = () => { 
      console.log("temp");
      console.log(tempProfile);
      if(tempProfile.password !== tempProfile.retype_password){
        setWarning(true);
        setWarningMessage("Nhập lại mật khẩu sai!")
      }  
      else{
        // setProfile({ ...tempProfile });
        setEditMode(false);
      }
      
      // Lưu thông tin vào server nếu cần thiết
      // axios.post('/api/profile', tempProfile)
      //      .then(response => console.log(response.data))
      //      .catch(error => console.log(error));
    };

    const enableEditPassword = () =>{
        setEditPassword(true);
    }
  
    return (
      <div className="profile-container">
        <img src={tempProfile.avatar} alt="Avatar" className="profile-image" />
        {editMode ? (
          <div className="infor">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              defaultValue={tempProfile.name}
              onChange={handleInputChange}
              className="input"
              placeholder="Họ và tên"
            />

            <label htmlFor="role">Tài khoản này của</label>
            <input
              type="text"
              name="role"
              defaultValue={tempProfile.role}
              onChange={handleInputChange}
              className="input"
              readOnly
            />

            <label htmlFor="email">Email</label> 
            <input
              type="email"
              name="email"
              defaultValue={tempProfile.email}
              className="input"
            />

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
              <button  className="btn btn-danger">Log out</button>
            </div>

            {warning ? (<p style={{color: "red"}}>{warningMessage}</p>) : (null)}
          </div>
        ) : (
          <>
            <h2>{tempProfile.name}</h2>
            <p>{tempProfile.role}</p>
            <button onClick={() => setEditMode(true)} className="button-setting">Edit Profile</button>
          </>
        )}
      </div>
    );
  };
  
  export default Profile;