import React, { useEffect, useState } from "react";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import "./App.css";

const App = () => {
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    axios.get("/message/sync").then(response => {
      
      setMessage(response.data);
    })
  }, []);

  
  useEffect(() => {
    const pusher = new Pusher("2d97d90aa64bc3c333ce", {
      cluster: "ap3",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessage([...messages , newMessage])
    });

    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);

  console.log(messages);

  return (
    <>
      <div className="app">
        <div className="app_body">
          <Sidebar />
          <Chat messages = {messages} />
        </div>
      </div>
    </>
  );
};

export default App;
