import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams }
  from "react-router-dom";

import { Login, Register, MyCourse, Course, Dashboard, Exam, Exercise, Profile, AccountManage } from "./pages";
import HomeBlog from "./pages/blog/HomeBlog.js";
import SingleBlog from "./pages/blog/SingleBlog.js";
import Navbar from "./component/Navbar/Navbar.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/authContext.js";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const PrivateRouteTeacher = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && currentUser.RoleId === 2;

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};

const PrivateRouteStudent = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && currentUser.RoleId === 3;

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};

const PrivateRouteAdmin = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && currentUser.RoleId === 1;

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};

const PrivateRouteUser = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser;

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};

const PrivateRouteNotAdmin = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser && currentUser.RoleId !== 1;

  return hasAccess ? <Element {...rest} /> : <Navigate to="/" />;
};

const PrivateRouteGuess = ({ element: Element, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const hasAccess = currentUser;

  return hasAccess ? <Navigate to="/" /> : <Element {...rest} />;
};

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login" exact
          element={<PrivateRouteGuess element={Login} />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/register" exact
          element={<PrivateRouteGuess element={Register} />} />
        <Route path="/mycourse" exact
          element={<PrivateRouteNotAdmin element={MyCourse} />} />
        <Route path="/course/:id" exact
          element={<PrivateRouteNotAdmin element={Course} />} />
        <Route path="/exam/:examID" exact
          element={<PrivateRouteNotAdmin element={Exam} />} />
        <Route path="/exercise/:examID" exact
          element={<PrivateRouteNotAdmin element={Exercise} />} />
        <Route path="/info" exact
          element={<PrivateRouteUser element={Profile} />} />
        <Route path="/blog/homepage" element={<HomeBlog />} />
        <Route path="/blog/post/:id" element={<SingleBlog />} />
        <Route path="/manage" exact element={<AccountManage />} />
      </Routes>
    </Router>

  );
}

export default App;