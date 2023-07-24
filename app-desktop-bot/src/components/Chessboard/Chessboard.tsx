import { Box, Flex, Group, TextInput } from "@mantine/core";
import { Chessboard as ReactChessboard } from "react-chessboard";
import { chessGameState, playerColorState } from "../../store/atom";
import { useRecoilState, useRecoilValue } from "recoil";

const Chessboard = () => {
  const [game, setGame] = useRecoilState(chessGameState);
  const playerColor = useRecoilValue(playerColorState);
  // function makeAMove(move) {
  //   const gameCopy = { ...game };
  //   const result = gameCopy.move(move);
  //   setGame(gameCopy);
  //   return result; // null if the move was illegal, the move object if the move was legal
  // }

  // function makeRandomMove() {
  //   const possibleMoves = game.moves();
  //   if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
  //     return; // exit if the game is over
  //   const randomIndex = Math.floor(Math.random() * possibleMoves.length);
  //   makeAMove(possibleMoves[randomIndex]);
  // }

  function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
    console.log(sourceSquare);
    console.log(targetSquare);
    console.log(piece);

    // const move = makeAMove({
    //   from: sourceSquare,
    //   to: targetSquare,
    //   promotion: "q", // always promote to a queen for example simplicity
    // });
    // illegal move
    // if (move === null) return false;
    // setTimeout(makeRandomMove, 200);
    return true;
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
          {game.get_comment()}
        </Box>
      </Flex>
    </Group>
  );
};

export default Chessboard;
