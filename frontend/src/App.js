import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Loginpages/login";
import SignupPage from "./pages/Loginpages/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatDashboard from "./pages/chatTab/ChatDashboard";
import MeetingPage from "./pages/WaitingRoom/MeetingPage";
import ErrorPage from "./pages/ErrorPage/Errorpage";
import MeetingEndPage from "./pages/MeetingEndPage/MeetingEndPage";


export default function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>

            <Route path="/meeting" element={<MeetingPage />} />

            {/* Auth */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chat" element={<ChatDashboard />} />

            {/* Meetings */}
            {/*
            
          <Route path="/create-meeting" element={<CreateMeeting />} />
          <Route path="/waiting-room/:meetingId" element={<WaitingRoom />} />
          <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
          <Route path="/meeting/:meetingId/chat" element={<ChatPanel />} />
          <Route path="/meeting/:meetingId/participants" element={<ParticipantsPanel />} />
         

          */}

          {/* Meeting End page */}
            <Route path="/meeting-ended" element={<MeetingEndPage />} />

            {/* Settings */}
            {/* <Route path="/settings" element={<ProfileSettings />} /> */}

            {/* Fallback */}
            <Route path="/error" element={<ErrorPage />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}