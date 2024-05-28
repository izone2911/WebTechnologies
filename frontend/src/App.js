import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";
//---------------------------------------------------------
// import Navbar from './component/navbar/Navbar'

import { Login, Register, MyCourse, Course, Dashboard, Exam, HomePage, Profile} from "./pages";
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
      </Routes>
    </Router>
    
  );
}

export default App;