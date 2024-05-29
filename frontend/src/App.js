import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";
//---------------------------------------------------------
// import Navbar from './component/navbar/Navbar'

import { Login, Register, MyCourse, Course, Dashboard, Exam, HomePage, BlogPage, Profile} from "./pages";
function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/dashboard" />} /> */}
        <Route path="/" element={<Navigate replace to="/login"/>} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/profile"  exact element={<Profile />}  />
        <Route path="/dashboard"  exact element={<Dashboard />}  />
        <Route path="/register" exact element={<Register />} />
        <Route path="/mycourse" exact element={<MyCourse />} />
        <Route path="/course/:id" exact element={<Course />} />
        <Route path="/exam/:examID" exact element={<Exam />} />
        <Route path="/homepage" exact element={<HomePage />} />
        <Route path="/blog/:id" exact element={<BlogPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;