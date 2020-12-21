import {Map} from "immutable"
import {Piece, PieceId} from "features/piece/types"

export type ChessboardState = {
  boardSize: number,
  pieces: Map<PieceId, Piece>
  selectedPieceId?: PieceId
}

export type ChessboardStateSlice = {
  chessboard: ChessboardState
}
