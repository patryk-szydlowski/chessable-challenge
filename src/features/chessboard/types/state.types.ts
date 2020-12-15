import {PieceDefinition} from "features/piece/types";

export type ChessboardState = {
  chessboardSize: number
  pieces: Map<number, PieceDefinition | undefined>
}

export type ChessboardStateSlice = {
  chessboard: ChessboardState
}
