import {Map} from "immutable"
import {Piece, PieceId} from "features/piece/types"
import {ChessboardError} from "./error.types"

export type ChessboardState = {
  boardSize: number,
  pieces: Map<PieceId, Piece>
  selectedPieceId?: PieceId
  error?: ChessboardError
}

export type ChessboardStateSlice = {
  chessboard: ChessboardState
}
