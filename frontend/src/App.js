import { BrowserRouter as Router, Routes, Route, Navigate } 
  from "react-router-dom";
//---------------------------------------------------------
// import Navbar from './component/navbar/Navbar'

import { Login, Register, } from "./pages";
function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/login"  exact element={<Login />}  />
        <Route path="/register" exact element={<Register />} />
      </Routes>
    </Router>
    
  );
}

export default App;