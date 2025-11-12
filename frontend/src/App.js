import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPages/Login";
import SignupPage from "./pages/LoginPages/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatDashboard from "./pages/chatTab/ChatDashboard";
import MeetingWaitingPage from "./pages/WaitingRoom/MeetingWaitingPage";
import ErrorPage from "./pages/ErrorPage/Errorpage";
import MeetingEndPage from "./pages/MeetingEndPage/MeetingEndPage";
import ProfileSettings from "./pages/profile/ProfileSettings";
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import AppLayout from "./layout/AppLayout";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>

          {/* Auth */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Layout Pages */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/chat" element={<ChatDashboard />} />
            <Route path="/settings" element={<ProfileSettings />} />
          </Route>

          {/* Meetings */}
          <Route path="/meeting-room" element={<MeetingRoom />} />
          <Route path="/meeting-ended" element={<MeetingEndPage />} />
          <Route path="/meeting" element={<MeetingWaitingPage />} />

          {/* Error Page */}
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />

          {/* Meetings */}
          {/*
          <Route path="/meeting/chat" element={<ChatPanel />} />
          <Route path="/meeting/participants" element={<ParticipantsPanel />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}
