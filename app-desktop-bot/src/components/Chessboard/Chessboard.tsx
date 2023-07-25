import { Box, Button, Flex, Group, Text, TextInput } from "@mantine/core";
import { Chessboard as ReactChessboard } from "react-chessboard";
import {
  chessGameState,
  isGameStartState,
  playerColorState,
} from "../../store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import { ShortMove } from "chess.js";
const Chessboard = () => {
  const [game, setGame] = useRecoilState(chessGameState);
  const playerColor = useRecoilValue(playerColorState);
  const isGameStart = useRecoilValue(isGameStartState);
  function makeAMove(move: string | ShortMove) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
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
      if (isGameStart == true) {
        console.log("This will run every second!");
        invokeAll();
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [isGameStart]);
  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    console.log(sourceSquare);
    console.log(targetSquare);
    console.log(piece);

    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    // illegal move
    if (move === null) return false;
    console.log(game.moves());

    // setTimeout(makeRandomMove, 200);
    return true;
  }
  function invokeAll() {
    // invoke("get_all_moves", { value: game.fen() }).then((res) =>
    //   console.log(res)
    //   makeAMove({
    //     from:'a1'
    //   })
    // );
    invoke("step_new", { playerFen: game.fen(), moveList: game.moves() }).then(
      (res: string) => {
        // const resp = res.split("");
        console.log(res);
        makeAMove({
          from: res[0] + res[1],
          to: res[2] + res[3],
        });
      }
    );
  }
  return (
    <Group position="center" align={"center"}>
      <Flex direction={"column"}>
        <Box w={"600px"}>
          <ReactChessboard
            position={game.fen()}
            id="BasicBoard"
            onPieceDrop={onDrop}
            boardOrientation={playerColor}
          />
        </Box>
        <Box mt={"lg"}>
          <TextInput
            placeholder="Current FEN"
            label="Current FEN"
            withAsterisk
            value={game.fen()}
            readOnly
          />
          {/* {game.get_comment()} */}
          <Text>{game.get_comment()}</Text>
        </Box>
        <Box my={"lg"}>
          <Button onClick={() => invokeAll()}>manualq</Button>
        </Box>
      </Flex>
    </Group>
  );
};

export default Chessboard;
