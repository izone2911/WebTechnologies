import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } 
  from "react-router-dom";

import { Login, Register, MyCourse, Course, Dashboard, Exam, Exercise, Profile, HomePage, BlogPage} from "./pages";
import Navbar from "./component/Navbar/Navbar.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};


function App() {
  return (
    <Router>
      <Layout/>
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard"/>} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/profile"  exact element={<Profile />}  />
        <Route path="/dashboard"  exact element={<Dashboard />}  />
        <Route path="/register" exact element={<Register />} />
        <Route path="/mycourse" exact element={<MyCourse />} />
        <Route path="/course/:id" exact element={<Course />} />
        <Route path="/exam/:examID" exact element={<Exam />} />
        <Route path="/exercise/:examID" exact element={<Exercise />} />
        <Route path="/info" exact element={<Profile />} />
        <Route path="/homepage" exact element={<HomePage />} />
        <Route path="/blog/:id" exact element={<BlogPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;