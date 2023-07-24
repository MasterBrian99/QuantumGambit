import { atom } from "recoil";
import { Chess, ChessInstance } from "chess.js";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

const chessGameState = atom<ChessInstance>({
  key: "chessGame", // unique ID (with respect to other atoms/selectors)
  default: new Chess(), // default value (aka initial value)
});

const playerColorState = atom<BoardOrientation>({
  key: "playerColor", // unique ID (with respect to other atoms/selectors)
  default: "white", // default value (aka initial value)
});

export { chessGameState, playerColorState };
