const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const http = require("http");
const {Server} = require("socket.io");

const server = http.createServer(router);
const io = new Server(server);

/**
 * GET route template
 */
router.get('/', (req, res) => {
    // GET route code here
  console.log('💬 MESSAGES GET ROUTE IS ONLINE 💬');
  
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
  console.log('💬 MESSAGES POST ROUTE IS ONLINE 💬');
});

module.exports = router;
