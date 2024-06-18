const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const http = require("http");
const { Server } = require("socket.io");
const {createServer} = require('node:http')
const { join } = require('node:path');


const app = express();
const server = createServer(app);


app.use(express.json()); // allows us to send data from the front end to the backend
app.use(express.static(join(__dirname, 'public')));
app.use('/api/messages', router);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }, 
});



/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log('💬 MESSAGES GET ROUTE IS ONLINE 💬');

  const sqltext = `SELECT * FROM messages`

  io.on('connection', (socket) => {
    console.log('a user connected');
  });

  pool
    .query(sqltext)
    .then((dbres) => {
      console.log(dbres.rows)
      res.send(dbres.rows)
    })
    .catch((err) => {
      console.log('Error In GET ROUTE', err)
      res.sendStatus(500)
    })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  console.log('💬 MESSAGES POST ROUTE IS ONLINE 💬');
  let userID = req.body.user_id
  let user = req.user.id 
  userID = user 
  const lovedOneId= req.body.loved_one_id
  const messageText = req.body.message_text

  const sqlText = `INSERT INTO messages
                    (loved_one_id, user_id, message_text)
                   VALUES 
                  ($1,$2,$3);`
  const sqlvalue = [
          userID,
          lovedOneId,
          messageText
  ]
    pool
      .query(sqlText, sqlvalue)
      .then((res) => {
        console.log('Result is:', res)
        io.emit('newMessage', res.rows[0]); // emit new message to all connected clients
      })
      .catch((err) => {
        console.log('Error in POST Route Messages', err)
        res.sendStatus(500)
      })
});
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // handle disconnection
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
  socket.on('chat message', (message) => {
    console.log('Received message from client:', message);
    io.emit('newMessage', message); // emit the new message to all connected clients
});
});
server.listen(3000, () => {
  console.log('Listening on port 3000');
});
module.exports = router;
