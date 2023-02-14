import React from "react";
import "./Css/Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar_header">
          <Avatar src="https://image.cnbcfm.com/api/v1/image/107083077-1656593419933-gettyimages-1395062617-t_w16437_4934a878-972d-4bea-b6ef-b61f4ceeb787.jpeg?v=1673375638" />
          <div className="sidebar_header_right">
            <IconButton>
              <DonutLargeIcon className="icon" />
            </IconButton>
            <IconButton>
              <ChatIcon className="icon" />
            </IconButton>
            <IconButton>
              <MoreVertIcon className="icon" />
            </IconButton>
          </div>
        </div>

        <div className="sidebar_search">
          <div className="sidebar_searchContainer">
            <SearchOutlined className="searchIcon" />
            <input type="text" placeholder="Search or Start new chat" />
          </div>
        </div>

        <div className="sidebar_chats">
        <h2>Add new Chat</h2>
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
