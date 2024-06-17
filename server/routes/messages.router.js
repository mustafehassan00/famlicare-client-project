const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors")

const server = http.createServer(router);
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

  pool
    .query(sqltext)
    .then((dbres) => {
      res.send(dbres)
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

  pool
    .query()
    .then(() => {

    })


});

module.exports = router;
