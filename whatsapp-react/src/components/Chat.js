import {
  AttachFile,
  InsertEmoticonRounded,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Css/Chat.css";
import axios from "../axios";

const Chat = ({ messages }) => {
  const [input, setInput] = useState("");

  const submitButton = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "Yash",
      timestamp: "Just Now",
      recieved: true,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Name</h3>
          <p>last seen ...</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message, index) => (
          <p
            className={`chat_message ${message.recieved && "chat_reciever"}`}
            key={index}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_time">{new Date().toLocaleString()}</span>
          </p>
        ))}
      </div>

      <div className="chat_footer">
        <InsertEmoticonRounded className="chat_icon" />
        <form>
          <input
            type="text"
            placeholder="Enter Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" onClick={submitButton}>
            Send
          </button>
        </form>
        <Mic className="chat_icon" />
      </div>
    </div>
  );
};

export default Chat;
