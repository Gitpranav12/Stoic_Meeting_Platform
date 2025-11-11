import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Loginpages/login";
import SignupPage from "./pages/Loginpages/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatDashboard from "./pages/chatTab/ChatDashboard";
import MeetingPage from "./pages/MeetingRoom";


export default function App() {
    const [screen, setScreen] = useState("dashboard");

    const handleNavigate = (nextScreen) => {
        setScreen(nextScreen);
    };

    const handleLogout = () => {
        alert("Logged out!");
        setScreen("dashboard");
    };

    return ( <> 
       <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatDashboard />} />
          <Route path="/meeting" element={<MeetingPage />} />

        </Routes>
      </div>
    </Router>
        </>
    );
}