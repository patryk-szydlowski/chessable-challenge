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

export type CapturePiece = {
  piece: Piece
  capturePosition: PiecePosition
}

export type CapturedPiece = {
  piece: Piece
  capturedPiece: Piece
}
