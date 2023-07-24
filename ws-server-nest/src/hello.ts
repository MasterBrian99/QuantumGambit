import { spawn } from "child_process";

const stockfishPath = "./stockfish"; // Replace with the actual path to your Stockfish executable
const stockfish = spawn(stockfishPath);
let stockfishStdin = stockfish.stdin;

export { stockfishStdin, stockfish };
