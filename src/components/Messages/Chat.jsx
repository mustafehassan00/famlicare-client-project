import React, { useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import useSocketSetup from "./UseSocketSetup";
import socket from "../../socket";
import { useEffect } from "react";

function Chat() {
  // Use this to use as auto fill to fill in the user
  const user = useSelector((store) => store.user);
  const lovedOneID = user.loved_one_id;
  const [room, setRoom] = useState(lovedOneID);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useSocketSetup();

  useEffect(() => {
    socket.emit("join_room", room);
    socket.emit("fetch messages", room);
    socket.on("Have messages", (messages) => {
      console.log("Received messages:", messages);
      setMessages(messages);
    });
  }, [room, socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        room: room,
      };
      console.log("Message User data:", messages);
      console.log(messageData.message);
      await socket.emit("new message", messageData);
      await socket.emit("fetch messages", room);
      setCurrentMessage("");
    }
  };
  return (
    <div>
      <div>
        <p>Live Chat</p>
      </div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            {user.id && (
              <strong>
                {message?.user_id === user.id ? (
                  "You"
                ) : (
                  <strong>{message.username}</strong>
                )}
                :{" "}
              </strong>
            )}
            {message?.message_text}
            <h5>{message?.msg_sent_timestamp}</h5>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
export default Chat;
