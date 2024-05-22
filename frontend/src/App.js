import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } 
  from "react-router-dom";
//---------------------------------------------------------

import { Login, Register, MyCourse, Course, Dashboard, Exam, Exercise} from "./pages";
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
        <Route path="/dashboard"  exact element={<Dashboard />}  />
        <Route path="/register" exact element={<Register />} />
        <Route path="/mycourse" exact element={<MyCourse />} />
        <Route path="/course/:id" exact element={<Course />} />
        <Route path="/exam/:examID" exact element={<Exam />} />
        <Route path="/exercise/:examID" exact element={<Exercise />} />
      </Routes>
    </Router>
    
  );
}

export default App;