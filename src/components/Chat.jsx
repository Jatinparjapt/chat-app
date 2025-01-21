// src/components/Chat.js
import React, { useState, useEffect } from "react";
import { socket } from "../services/api"; // Ensure socket is initialized here
import Message from "./Message"; // Your message component
import backgroundImage from "../images/download.jpeg";

const Chat = ({ userName }) => {
  const [messages, setMessages] = useState([]); // Store messages
  const [input, setInput] = useState(""); // Store input message

  useEffect(() => {
    // Fetch initial messages
    socket.emit("fetchMessages");

    // Listen for all messages
    socket.on("messages", (data) => {
      setMessages(data);
    });

    // Listen for new messages
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    return () => {
      socket.off("messages");
      socket.off("newMessage");
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      // Send the message with the user name
      socket.emit("sendMessage", { user: userName, message: input });
      setInput(""); // Clear the input field
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex flex-col mx-auto md:w-1/4 h-screen bg-white bg-opacity-80 rounded-lg shadow-xl">
          <div className="flex items-center justify-center bg-blue-500 text-white py-4 rounded-t-lg shadow-lg">
            <h1 className="text-xl font-semibold">Chatbot</h1>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 shadow-md">
            {messages.map((msg) => (
              <Message key={msg.id} user={msg.user} message={msg.message} currentUser={userName} />
            ))}
          </div>
          <div className="p-4 bg-white shadow-lg flex items-center space-x-4 rounded-b-lg">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
