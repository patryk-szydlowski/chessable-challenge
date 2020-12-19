import {Map, Set} from "immutable"
import {ChessboardState} from "features/chessboard/types"
import {Piece, PieceColor, PieceId, PieceType} from "features/piece/types"

const initialPieceId: PieceId = 0

const initialPiece: Piece = {
  id: initialPieceId,
  type: PieceType.PAWN,
  color: PieceColor.BLACK,
  position: {x: 2, y: 6},
  specialStates: Set()
}

export const initialState: ChessboardState = {
  boardSize: 8,
  pieces: Map([[initialPieceId, initialPiece]])
}
