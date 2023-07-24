import { useEffect, useState } from "react";
import { Chess, ShortMove } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Square } from "./types";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [game, setGame] = useState(new Chess());
  const socket = new WebSocket("ws://localhost:3000");
  function makeAMove(move: string | ShortMove) {
    console.log(move);

    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    // socket.send(game.fen());
    // startGame();
    // makeWebsocketMove();
    return result; // null if the move was illegal, the move object if the move was legal
  }

  // function makeRandomMove() {
  //   const possibleMoves = game.moves();
  //   if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
  //     return; // exit if the game is over
  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   makeAMove(possibleMoves[randomIndex]);
  // }
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStart == true) {
        console.log("This will run every second!");
        makeWebsocketMove();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isStart]);
  function makeWebsocketMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    console.log(game.fen());
    console.log(game.history());
    socket.send(game.fen());
    socket.onmessage = (event) => {
      const stockfishMove = event.data;
      // board.position(stockfishMove);
      console.log(stockfishMove);
      const gds = stockfishMove.split("");
      makeAMove({
        from: gds[0] + gds[1],
        to: gds[2] + gds[3],
      });
    };
    console.log(possibleMoves);
    // startGame();
  }

  function startGame() {
    setIsStart(true);
    makeWebsocketMove();

    // socket.send(game.fen());
    // socket.onmessage = (event) => {
    //   const stockfishMove = event.data;
    //   // board.position(stockfishMove);
    //   console.log(stockfishMove);
    //   const gds = stockfishMove.split("");
    //   makeAMove({
    //     from: gds[0] + gds[1],
    //     to: gds[2] + gds[3],
    //   });
    // };
  }
  function onDrop(sourceSquare: Square, targetSquare: Square) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    // socket.send(move);
    // setTimeout(makeRandomMove, 200);
    makeWebsocketMove();
    return true;
  }
  return (
    <>
      <div style={{ width: "600px" }}>
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
      </div>
      <div>
        <button onClick={() => startGame()}>hello</button>
      </div>
    </>
  );
}
export default App;
