import React, { useState } from "react";
import { useSelector } from "react-redux";
import useSocketSetup from "./UseSocketSetup";
import socket from "../../socket";
import { useEffect } from "react";
import { Box, Typography, TextField, Button, Grid, useTheme } from "@mui/material";


function Chat() {

  const theme = useTheme();
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
  }, [room, socket]);

useEffect(() => {
    socket.on("Have messages", (messages) => {
      console.log("Received messages:", messages);
      setMessages(messages);
    });
  }, [socket]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        message: currentMessage,
        room: room,
      };
      console.log("Message User data:", messages);
      console.log(messageData.message);
      socket.emit("new message", messageData);
      await socket.emit("fetch messages", room)
      setCurrentMessage("");
    }
  };
  return (
    <Box sx={{ padding: 2, height: "100vh", overflowY: "auto" }}>
      <Typography variant="h5" gutterBottom>
        CareTeam Chat
      </Typography>
      <Grid container spacing={2}>
        {messages.map((message, index) => (
          <Grid item key={index} xs={12}>
            <Box
              sx={{
                padding: 1,
                borderRadius: 1,
                backgroundColor: message.user_id === user.id? theme.palette.primary.main : theme.palette.tertiary.light,
                maxWidth: "80%",
                marginLeft: message.user_id === user.id? "auto" : 0,
                marginRight: message.user_id === user.id? 0 : "auto",
              }}
            >
              <Typography variant="body1">
                {user.id && (
                  <strong>
                    {message.user_id === user.id? "You" : message.username}
                  </strong>
                )}
                : {message.message_text}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {message.msg_sent_timestamp}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}>
        <TextField
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
export default Chat;
