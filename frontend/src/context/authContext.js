import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user")!==undefined?JSON.parse(localStorage.getItem("user")) : null
  );

  const login = async (inputs) => {

    setCurrentUser(inputs);
    console.log("login thanh cong",inputs);

    // Thiết lập thời gian tồn tại của phiên đăng nhập là 30 phút (1800000 milliseconds)
    // const sessionTimeout = 1800000;

    // // Lưu thời gian hết hạn của phiên đăng nhập vào localStorage
    // const expirationTime = Date.now() + sessionTimeout;
    // localStorage.setItem("expirationTime", expirationTime);
  };

  const logout = async () => {
    await axios.post("http://localhost:4000/api/auth/logout");
    setCurrentUser(null);
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("user"); // Xóa thông tin người dùng từ localStorage
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));

    // Lấy thời gian hết hạn của phiên đăng nhập từ localStorage
    // const expirationTime = localStorage.getItem("expirationTime");

    // // Kiểm tra xem phiên đăng nhập có hết hạn chưa
    // if (expirationTime && Date.now() > Number(expirationTime)) {
    //   logout();
    // }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};