import React , { useEffect, useContext, useRef} from 'react'
import { NavLink, Link, useNavigate} from 'react-router-dom';

import $ from 'jquery';
import './dependencies/bootstrap/js/bootstrap.bundle.min';

import './dependencies/fontawesome/css/all.css';
import './dependencies/bootstrap/css/bootstrap.min.css';
import './Navbar.css';

import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/dashboard');
  };
  
  function animation(){
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      "top":itemPosNewAnimTop.top + "px", 
      "left":itemPosNewAnimLeft.left + "px",
      "height": activeWidthNewAnimHeight + "px",
      "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        "top":itemPosNewAnimTop.top + "px", 
        "left":itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
      });
    });
  }
  
  useEffect(() => {

    animation();
    $(window).on('resize', function(){
      setTimeout(function(){ animation(); }, 500);
    });

  }, []);

  const coursesRef = useRef(null)  
  useEffect(() => {coursesRef.current.click()}, [currentUser])

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">

      <NavLink className="navbar-brand navbar-logo" to="/" exact="true">
        Thi trực tuyến
      </NavLink>
    
      <button 
        className="navbar-toggler"
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
            
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            
            {currentUser?
              currentUser.RoleId === 1 ? 
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" exact="true">
                  Dashboard
                </NavLink>
              </li> 
            : <li className="nav-item">
                <NavLink className="nav-link" to="/mycourse" exact="true">
                  My Courses
                </NavLink>
              </li>
            : null}

            <li className="nav-item active" ref={coursesRef}>
              <NavLink className="nav-link" to="/courses" exact="true">
                Courses
              </NavLink> 
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/blog" exact="true">
                Blog
              </NavLink>
            </li>

            <span>
              <Link to=""></Link>
            </span>
            {currentUser ? <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info" exact="true">
                  {currentUser?.email}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={handleLogout} className="nav-link" to="/courses" exact="true">
                  Logout
                </NavLink>
              </li>
            </> : <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" exact="true">
                  Login
                </NavLink>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;