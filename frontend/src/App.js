import React, { useState } from "react";
import Dashboard from "./pages/dashboard/Dashboard";
import ChatDashboard from "./pages/chatTab/ChatDashboard";


export default function App() {
  const [screen, setScreen] = useState("dashboard");

  const handleNavigate = (nextScreen) => {
    setScreen(nextScreen);
  };

  const handleLogout = () => {
    alert("Logged out!");
    setScreen("dashboard");
  };

  return (
    <>
      {screen === "dashboard" && (
        <Dashboard onNavigate={handleNavigate} onLogout={handleLogout}
          active={screen} // ✅ pass current tab
        />
      )}
      {screen === "chat" && (
        <ChatDashboard onNavigate={handleNavigate} onLogout={handleLogout}
          active={screen} // ✅ pass current tab
        />
      )}

       {/* {screen === "settings" && (
        // pass setting page
      )} */}
      
    </>
  );
}
