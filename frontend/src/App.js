import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";
//---------------------------------------------------------
// import Navbar from './component/navbar/Navbar'

import { Login, Register, MyCourse, Course} from "./pages";
function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        {/* <Route path="/" element={<Navigate replace to="/dashboard" />} /> */}
        <Route path="/" element={<Navigate replace to="/login"/>} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/register" exact element={<Register />} />
        <Route path="/mycourse" exact element={<MyCourse />} />
        <Route path="/course" exact element={<Course />} />
      </Routes>
    </Router>
    
  );
}

export default App;