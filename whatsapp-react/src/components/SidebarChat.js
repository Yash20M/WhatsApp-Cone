import React from "react";
import "./Css/sidebarChat.css";
import { Avatar } from "@mui/material";

const SidebarChat = () => {
  return (
    <>
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat_info">
        <h2>Name</h2>
        <p>This is the last message</p>
      </div>
    </div>
    </>
  );
};

export default SidebarChat;
