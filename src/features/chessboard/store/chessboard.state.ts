import {ChessboardState} from "features/chessboard/types";

export const initialState: ChessboardState = {
  chessboardSize: 8,
  pieces: new Map([
    [10, {type: "pawn", color: "black"}],
  ])
}
