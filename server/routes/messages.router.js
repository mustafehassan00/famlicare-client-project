const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const app = express()
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
// Will resolve any issues we have with any cors issue we have works with line 6
app.use(cors());

// this will generate a server for us 
const server = http.createServer(app)

//Using this to establish a connection
const io = new Server(server, {
    cors: {
      origin:"http://localhost:5173",
      method: ["GET", "POST"],
    }
});

//listening to a event & connects to our server
io.on("connection", (socket) => {
  // Gets the Id of the user connected 
  console.log("socket ID is:", socket.id)

// Disconnects from our server
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} Disconnected`)
  })
})

server.listen(3001, () => {
  console.log('SERVER RUNNING ON 3001', )
})
module.exports = router;
