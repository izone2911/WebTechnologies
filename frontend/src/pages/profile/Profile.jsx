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

    // convert format date time
    const formatDate = (dateString) => {
      console.log(dateString + "dumb");
      if(dateString != null && dateString != undefined)
        return dateString.split('T')[0];
      return '2000-01-01';
    };
  
    return (
    <div style={{display: "flex", width: "100%", padding: "20px"}}>
      <div className="profile-container" style={{height:"460px", width: "500px", display: "flex", flexDirection:"column", alignItems: "center"}}>
        <img src={tempProfile.avatar} alt="Avatar" className="profile-image"/>
        <div style={{marginBottom: "30px"}}>{tempProfile.name}</div>
        <button onClick={handleLogOut} className="btn btn-danger" style={{margin:"30px 0", width:"150px", height:"50px", fontSize:"20px"}}>Log out</button>
      </div>


      <div className="profile-container" style={{width: "99%", justifyContent: "space-around"}}>
        {editMode ? (
          <div className="infor display">
            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                name="name"
                defaultValue={tempProfile.name}
                onChange={handleInputChange}
                className="input"
                placeholder="Họ và tên"
              />
            </div>

            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
              <label htmlFor="role">Vai trò</label>
              <input
                type="text"
                name="role"
                defaultValue={tempProfile.role}
                className="input"
                readOnly
              />
            </div>

            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
              <label htmlFor="email">Email</label> 
              <input
                type="email"
                name="email"
                defaultValue={tempProfile.email}
                className="input"
                readOnly
              />
            </div>

            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
              <label htmlFor="phone">SĐT</label>
              <input
                type="tel"
                name="phone"
                onChange={handleInputChange}
                defaultValue={tempProfile.phone}
                className="input"
              />
            </div>

            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
              <label htmlFor="birthDay">Ngày sinh</label>
              <input
                type="date"
                name="birthDay"
                onChange={handleInputChange}
                defaultValue={formatDate(tempProfile.birthDay)}
                className="input"
              />
            </div>

            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
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
            </div>

            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
              <label htmlFor="password">Mật khẩu</label>

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
              </div>
            </div>
            <div style={{display: 'flex', alignItems: 'center', width:"50%", justifyContent: "space-between", padding:"5px 10px"}}> 
                    <label htmlFor="retype-password">Xác thực</label>
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

            <div className="choice-button" style={{display:"flex", width:"100%", }}>
              <button onClick={handleSave} className="btn btn-success">Save</button>
              <button onClick={()=>setEditMode(false)} className="btn btn-danger">Cancel</button>
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
    </div>);
  };
  
  export default Profile;
