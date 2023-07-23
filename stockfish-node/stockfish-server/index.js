const express = require('express');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

const stockfishPath = './stockfish-ubuntu-x86-64'; // Replace with the actual path to your Stockfish executable

let stockfish = spawn(stockfishPath);
let stockfishStdin = stockfish.stdin;

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // When the player makes a move
    console.log(message.toString());
    let move = message.toString().trim();

    // Send the player's move to Stockfish
    stockfishStdin.write(`position startpos \n`);
    stockfishStdin.write(`position fen ${move}\n`);
    stockfishStdin.write('go depth 15\n');
  });
});

stockfish.stdout.on('data', (data) => {
  let output = data.toString();
  let lines = output.split('\n');

  for (let line of lines) {
    if (line.startsWith('bestmove')) {
      // Extract Stockfish's move from the output
      let stockfishMove = line.split(' ')[1].trim();
        console.log(stockfishMove);
      // Send Stockfish's move back to the player
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(stockfishMove);
        }
      });
    }
  }
});
