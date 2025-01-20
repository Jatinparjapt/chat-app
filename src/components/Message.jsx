// src/components/Message.js
import React from "react";

const Message = ({ user, message, currentUser }) => {
  // Check if the message sender is the current user
  const isUser = user === currentUser;

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} items-center space-x-2`}
    >
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        <p className="text-sm font-medium">{user}</p>
        <p className="text-base">{message}</p>
      </div>
    </div>
  );
};

export default Message;
