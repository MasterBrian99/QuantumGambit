import express from "express";
const app = express();
import { spawn } from "child_process";

const stockfishPath = "./stockfish"; // Replace with the actual path to your Stockfish executable

let stockfish = spawn(stockfishPath);
let stockfishStdin = stockfish.stdin;

app.get("/", (_req, res) => {
  // render the index template
  res.render("index");
});

app.get("/nice", (req, res) => {
  // render the index template
  const playerMove = req.body.move.trim();
  stockfishStdin.write(`position startpos \n`);
  stockfishStdin.write(`position fen ${playerMove}\n`);
  stockfishStdin.write("go depth 15\n");

  stockfish.stdout.once("data", (data) => {
    let output = data.toString();
    let lines = output.split("\n");

    for (let line of lines) {
      if (line.startsWith("bestmove")) {
        // Extract Stockfish's move from the output
        let stockfishMove = line.split(" ")[1].trim();

        // Respond with Stockfish's move
        res.json({ move: stockfishMove });
        return;
      }
    }

    // If no move found, respond with an error
    res.status(500).json({ error: "Stockfish move not found" });
  });
});

// start the express server
app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:3000`);
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
      return stockfishMove;
    }
  }
});
