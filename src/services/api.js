import { io } from "socket.io-client";

const SOCKET_URL = "https://chat-app-backend-uw58.onrender.com"; // Replace with your backend URL
export const socket = io(SOCKET_URL);
