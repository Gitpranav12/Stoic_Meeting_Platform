import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MicControl from "../components/MicControl";
import CameraControl from "../components/CameraControl";
import ScreenShareControl from "../components/ScreenShareControl";
import ReactionControl from "../components/ReactionControl";
import GridControl from "../components/GridControl";
import ChatControl from "../components/ChatControl";
import SettingsControl from "../components/SettingsControl";
import MoreOptionsControl from "../components/MoreOptionsControl";
import EndCallControl from "../components/EndCallControl";

const ControlBar = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-3 bg-transparent shadow-sm">
      <MicControl />
      <CameraControl />
      <ScreenShareControl />
      <ReactionControl />
      <GridControl />
      <ChatControl />
      <SettingsControl />
      <MoreOptionsControl />
      <EndCallControl />
    </div>
  );
};

export default ControlBar;
