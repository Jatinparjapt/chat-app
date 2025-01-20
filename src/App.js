// src/App.js
import React, { useState, useEffect } from "react";
import Chat from "./components/Chat"; // Your chat component
import "./App.css";

const App = () => {
  const [userName, setUserName] = useState(""); // User name
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Dialog visibility state

  // Effect to show dialog when the app loads
  useEffect(() => {
    // Check if the user name is already saved in localStorage
    const savedUserName = localStorage.getItem("userName");

    if (!savedUserName) {
      setIsDialogOpen(true); // Show dialog if no user name is saved
    } else {
      setUserName(savedUserName);
    }
  }, []);

  // Function to handle user name submission
  const handleUserNameSubmit = () => {
    if (userName.trim()) {
      // Save user name in localStorage
      localStorage.setItem("userName", userName);
      setIsDialogOpen(false); // Close the dialog after submission
    }
  };

  return (
    <div className="App">
      {/* Dialog for entering user name */}
      {isDialogOpen && (
        <dialog open className="p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl mb-4">Enter Your Name</h2>
          <input
            type="text"
            placeholder="Enter your name"
            className="border border-gray-300 p-2 rounded-lg mb-4 w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleUserNameSubmit}
          >
            Submit
          </button>
        </dialog>
      )}

      {/* Chat application component */}
      {!isDialogOpen && <Chat userName={userName} />}
    </div>
  );
};

export default App;
