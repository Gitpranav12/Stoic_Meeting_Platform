import React, { useState, useEffect } from "react";
import { Mic, Video, Settings } from 'lucide-react';

/**
 * A custom hook to track the viewport width.
 * This lets us make our inline styles responsive.
 */
const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width };
};

export default function WaitingRoom({ meetingTitle, hostName, description }) {
  const { width } = useViewport();
  const isMobile = width < 768; 

  return (
    <div style={{
      minHeight: "100vh",
      background: "#343232ff",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: isMobile ? "16px" : "24px",
    }}>
      <div style={{
        maxWidth: 900,
        width: "100%", 
        margin: "0 auto",
        display: "flex",
        flexDirection: isMobile ? "column" : "row", 
        gap: isMobile ? 32 : 48, 
        background: "#111",
        borderRadius: 16,
        padding: isMobile ? 24 : 32, 
        boxSizing: "border-box", 
      }}>
        
        {/* Left: Camera preview */}
        <div style={{
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            width: "100%", 
            aspectRatio: "16 / 9", 
            background: "linear-gradient(125deg,#23304a 48%,#26304a 100%)",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            color: "#fff",
            position: "relative",
            minWidth: 280, 
          }}>
            <div style={{
              position: "absolute", left: 12, bottom: 12,
              background: "#222", borderRadius: 6,
              fontSize: 15, padding: "3px 10px"
            }}>
              You
            </div>
          </div>
          
          {/* Icon buttons row */}
          <div style={{
            display: "flex", gap: 25, marginTop: 20,
            padding: 10, background: "#181c20", borderRadius: 16
          }}>
            <button style={{
              width: 55, height: 55, borderRadius: "50%",
              background: "#23272b", border: "none",
              color: "#bcbcbc", display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}>
              <Mic size={22} />
            </button>
            <button style={{
              width: 55, height: 55, borderRadius: "50%",
              background: "#23272b", border: "none",
              color: "#bcbcbc", display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}>
              <Video size={22} />
            </button>
            <button style={{
              width: 55, height: 55, borderRadius: "50%",
              background: "#23272b", border: "none",
              color: "#bcbcbc", display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer"
            }}>
              <Settings size={22} />
            </button>
          </div>
        </div>
        
        {/* Right side: Info */}
        <div style={{
          flex: "2 1 0",
          paddingLeft: isMobile ? 0 : 32,
          paddingTop: isMobile ? 24 : 0, 
        }}>
          <h2 style={{ color: "#fff", marginBottom: 10 }}>Ready to Join?</h2>
          <div style={{ color: "#aaa", fontSize: 15, marginBottom: 20 }}>
            Check your camera and microphone before joining
          </div>
          
          <div style={{
            background: "#181c20", borderRadius: 12,
            padding: 22, marginBottom: 30
          }}>
            <div style={{ fontSize: 18, color: "#fff", marginBottom: 4, fontWeight: "bold" }}>
              {meetingTitle || "Team Standup"}
            </div>
            <div style={{ fontSize: 14, marginBottom: 8, color: "#cccc" }}>
              Hosted by {hostName || "John Doe"}
            </div>
            <div style={{ fontSize: 15, marginBottom: 9, color: "#bbb" }}>
              <span style={{ display: "inline-block", marginBottom: 3 }}>Description</span>
              <div style={{
                background: "#23272b", borderRadius: 6, padding: "7px 13px",
                fontSize: 16, color: "#eee"
              }}>
                {description || "Daily sync-up meeting."}
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#bbb", marginTop: 15 }}>
              <span style={{ marginRight: 7, color: "#68a6fa", fontSize: 16 }}>•</span>
              Waiting for host to start the meeting...
            </div>
          </div>
          
          <button disabled style={{
            marginBottom: 18, background: "#2075f7", color: "#fff",
            border: "none", borderRadius: 8, padding: "12px 0",
            fontSize: 19, fontWeight: 500, width: "100%",
            opacity: 1, cursor: "not-allowed"
          }}>
            Join Meeting
          </button>
          
          <div style={{ fontSize: 12, color: "#888", marginTop: 7, textAlign: "center" }}>
            By joining, you agree to our terms of service
          </div>
        </div>
      </div>
    </div>
  );
}