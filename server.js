// Run with: node server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let pcClient = null;

wss.on('connection', (ws) => {
  ws.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      if (data.tilt !== undefined && pcClient) {
        pcClient.send(msg);
      }
    } catch (e) {}
  });

  ws.on('close', () => {
    if (ws === pcClient) pcClient = null;
  });

  // First client to connect is PC
  if (!pcClient) pcClient = ws;
});
