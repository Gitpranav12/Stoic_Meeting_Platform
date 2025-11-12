import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Loginpages/login";
import SignupPage from "./pages/Loginpages/SignupPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatDashboard from "./pages/chatTab/ChatDashboard";
import MeetingWaitingPage from "./pages/WaitingRoom/MeetingWaitingPage";
import ErrorPage from "./pages/ErrorPage/Errorpage";
import MeetingEndPage from "./pages/MeetingEndPage/MeetingEndPage";
import ProfileSettings from "./pages/profile/ProfileSettings"
import MeetingRoom from "./pages/MeetingRoom/MeetingRoom";
import AppLayout from "./layout/AppLayout";


export default function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>

            {/* Auth */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Layout Tab Pages */}
            <Route element={<AppLayout />}>
              {/* Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
              {/* chat */}
              <Route path="/dashboard/chat" element={<ChatDashboard />} />
              {/* Settings */}
              <Route path="/settings" element={<ProfileSettings />} />
            </Route>

            {/* Meetings */}
            {/*
            
            <Route path="/create-meeting" element={<CreateMeeting />} />
            <Route path="/waiting-room/:meetingId" element={<WaitingRoom />} />
            <Route path="/meeting/:meetingId" element={<MeetingRoom />} />
            <Route path="/meeting/:meetingId/chat" element={<ChatPanel />} />
            <Route path="/meeting/:meetingId/participants" element={<ParticipantsPanel />} />
        
            */}

            {/* Meeting Room */}
            <Route path="/meeting-room" element={<MeetingRoom />} />

            {/* Meeting End page */}
            <Route path="/meeting-ended" element={<MeetingEndPage />} />

            {/* waiting Page */}
            <Route path="/meeting" element={<MeetingWaitingPage />} />

            {/* Fallback */}
            <Route path="/error" element={<ErrorPage />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}