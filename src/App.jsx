import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useEffect, useState} from "react"
import Navbar from "./components/Navbar.jsx";
import Auth from "./pages/Auth.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx"
import UploadVideo from './pages/UploadVideo.jsx';
import UsersList from './pages/Users.jsx';
import UserPage from './pages/User.jsx';



const App = () => {
  
  return (
    <div className="App">
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/user/:username" element={<UserPage />} />
            <Route path="/upload_video" element={<UploadVideo />} />
          </Routes>
        </Router>  
    </div>
  );
}

export default App;
