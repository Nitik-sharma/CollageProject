"use client"; // ✅ Add this line at the very top

import React, { useState, useEffect } from "react";
import socket from "../utils/socket";
import axios from "axios";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Fetch previous messages from backend
    useEffect(() => {
        axios.post("http://localhost:4000/api/messages/send")
            .then((res) => setMessages(res.data))
            .catch((err) => console.error("Error fetching messages:", err));

        socket.on("receiveMessage", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    // Send message to backend
    const sendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                sender: "User123", // Replace with actual sender ID
                content: message,
                timestamp: new Date().toISOString(),
            };

            socket.emit("sendMessage", newMessage);
            setMessages((prev) => [...prev, newMessage]); // Update UI
            setMessage("");

            try {
                await axios.post("http://localhost:4000/api/messages/send", newMessage);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
            <h2>Chat Room</h2>
            <div style={{ border: "1px solid #ccc", padding: "10px", minHeight: "300px" }}>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={{ width: "80%", padding: "5px" }}
            />
            <button onClick={sendMessage} style={{ marginLeft: "10px" }}>Send</button>
        </div>
    );
};

export default Chat;
