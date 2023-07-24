import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import WebSocket, { WebSocketServer } from "ws";

import { stockfishStdin, stockfish } from "./hello.js";
app.use(cors());
app.use(bodyParser.json());
// start the express server
const server = app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:3000`);
});

const wss = new WebSocketServer({ server });

app.use(express.static("public"));

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    // When the player makes a move
    console.log(message.toString());
    let move = message.toString().trim();

    // Send the player's move to Stockfish
    stockfishStdin.write(`position startpos \n`);
    stockfishStdin.write(`position fen ${move}\n`);
    stockfishStdin.write("go depth 15\n");
  });
});

stockfish.stdout.on("data", (data) => {
  let output = data.toString();
  let lines = output.split("\n");

  for (let line of lines) {
    if (line.startsWith("bestmove")) {
      // Extract Stockfish's move from the output
      let stockfishMove = line.split(" ")[1].trim();
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
