const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketIO(server, {cors: {origin: "*"}});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Generate a random CO2 value between 400 and 3500 ppm
function getRandomCO2Value() {
  return Math.floor(Math.random() * (3500 - 400 + 1) + 400);
}

// Send CO2 measurements to the connected clients every 10 seconds
setInterval(() => {
  const co2Value = getRandomCO2Value();
  io.emit('co2Measurement', co2Value);
}, 10000);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});