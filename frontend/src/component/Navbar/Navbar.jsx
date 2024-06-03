import React , { useEffect, useContext, useRef} from 'react'
import { NavLink, Link, useNavigate, useParams} from 'react-router-dom';

import $ from 'jquery';
import './dependencies/bootstrap/js/bootstrap.bundle.min';

import './dependencies/fontawesome/css/all.css';
import './dependencies/bootstrap/css/bootstrap.min.css';
import './Navbar.css';
import BookIcon from '@mui/icons-material/Book';
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
      "width": activeWidthNewAnimWidth + "px",
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
        <BookIcon style={{marginRight: 5, marginTop: -4}}/>
          Thi trực tuyến
      </NavLink>
    
      <button 
        className="navbar-toggler"
        style={{backgroundColor:"#585858"}}
        onClick={ function(){
          setTimeout(function(){ animation(); });
        }}
        type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" style={{width: '100%'}}>
            <div className="hori-selector">
            </div>

            {/* -------------------------------------------------------------------------------- */}
            <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
              <NavLink className="nav-link" to="/" exact="true">
                AAAAAAAAAAA
              </NavLink> 
            </li>
            <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
              <NavLink className="nav-link" to="/" exact="true">
                AAAAAAAAAAA
              </NavLink> 
            </li>
            <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
              <NavLink className="nav-link" to="/" exact="true">
                AAAAAAAAAAA
              </NavLink> 
            </li>
            <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
              <NavLink className="nav-link" to="/" exact="true">
                AAAAAAAAAAA
              </NavLink> 
            </li>

            {currentUser?
            null:
            <>
              <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
                <NavLink className="nav-link" to="/" exact="true">
                  AAAAAAAAAAA
                </NavLink> 
              </li>
              <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
                <NavLink className="nav-link" to="/" exact="true">
                  AAAAAAAAAAA
                </NavLink> 
              </li>
            </>
            }

            {currentUser?currentUser.roleID===1?
            <li className="nav-hidden" style={{pointerEvents:'none',visibility:'hidden'}}>
              <NavLink className="nav-link" to="/" exact="true">
              AAAAA
              </NavLink> 
            </li>:null:null}

            {/* -------------------------------------------------------------------------------- */}

            <li className="nav-item active" ref={coursesRef}>
              <NavLink className="nav-link" to="/dashboard" exact="true">
                Dashboard
              </NavLink> 
            </li>
            
            {currentUser?
              currentUser.roleID === 1 ? 
              <li className="nav-item">
                <NavLink className="nav-link" to="/manage" exact="true">
                  Manage
                </NavLink>
              </li> 
            :<>
              <li className="nav-item">
                <NavLink className="nav-link"  to="/mycourse" exact="true">
                  My Courses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to="/homepage" exact="true">
                  Blog
                </NavLink>
              </li>
            </>
            : null}

            {currentUser? <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/info" exact="true">
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink onClick={handleLogout} className="nav-link" to="/" exact="true">
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