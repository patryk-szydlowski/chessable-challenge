import {Piece, PieceId} from "features/piece/types"

export type ChessboardState = {
  boardSize: number,
  pieces: Map<PieceId, Piece>
}

export type ChessboardStateSlice = {
  chessboard: ChessboardState
}
