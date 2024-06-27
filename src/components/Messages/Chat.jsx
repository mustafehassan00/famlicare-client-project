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

    socket.on("message recieved", message => {
      if (message.user_id !== user.id) {

        setMessages(prevMessages => [...prevMessages, message])
        console.log('message is:', message)

      }
    })


    return () => {
      socket.off("connect_error")
      socket.off("connected")
      socket.off("messages")
      socket.off("message recieved")
    }

  }, [setMessages]);

  useEffect(() => {
    socket.on("Have messages", (messages) => {
      console.log("Received messages:", messages);
      setMessages(messages);
    });

    return() => 
      socket.off("Have messages")
  }, [setMessages]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        message_text: currentMessage,
        user_id: user.id,
        loved_one_id: lovedOneID
      };
      await socket.emit("new message", message);
      setMessages(prevMsgs => [...prevMsgs, message])
      setCurrentMessage("");
    }
  };

  console.log('messages is:', messages)

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
                backgroundColor: message.user_id === user.id ? theme.palette.primary.main : theme.palette.tertiary.light,
                maxWidth: "80%",
                marginLeft: message.user_id === user.id ? "auto" : 0,
                marginRight: message.user_id === user.id ? 0 : "auto",
              }}
            >
              <Typography variant="body1">
                {user.id && (
                  <strong>
                    {message.user_id === user.id ? "You" : 'other'}
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
