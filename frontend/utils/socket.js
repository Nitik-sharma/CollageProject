import { io } from "socket.io-client";

const socket = io("http://localhost:4000"); // Update to match your backend URL

export default socket;
