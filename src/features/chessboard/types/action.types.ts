import {Piece, PieceColor, PiecePosition, PieceType} from "features/piece/types"

export type SpawnPiece = {
  type: PieceType
  color: PieceColor
  position: PiecePosition
}

export type MovePiece = {
  piece: Piece
  toPosition: PiecePosition
}
